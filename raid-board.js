import { EmbedBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle } from 'discord.js';

const LEGACY_HEADING = '## ⚔️ RED SUN RISING / LIVE RAID BOARD';
const BOARD_MARKER = 'solara-live-raid-board-v2';
const MAX_RAIDS = 8;

async function raidListings(channel) {
  const found = [];
  let before;
  for (let page = 0; page < 5; page++) {
    const batch = await channel.messages.fetch({limit:100, ...(before ? {before} : {})});
    if (!batch.size) break;
    found.push(...batch.values());
    before = batch.last().id;
    if (batch.size < 100) break;
  }
  return found.filter(m =>
    m.author.id === channel.client.user.id &&
    /^solara-event\|\d+\|\d+$/.test(m.embeds[0]?.footer?.text || '') &&
    m.embeds[0]?.title?.startsWith('⚔️ Raid:')
  );
}

function makeBoard(raids, signups) {
  const active = raids.filter(m => !m.embeds[0].title.includes(' — CLOSED'));
  const board = new EmbedBuilder()
    .setColor(0xE8AD51)
    .setAuthor({name:'RED SUN RISING  •  WAR COUNCIL'})
    .setTitle('⚔️  THE RAID COMMAND')
    .setDescription(
      '**LIVE RAID BOARD**\n━━━━━━━━━━━━━━━━━━━━\n' +
      '*Where legends gather beneath the rising sun.*\n\n' +
      (active.length
        ? '**✦  UPCOMING RAIDS**'
        : '**✦  NO ACTIVE RAIDS**\nNo raids are currently open for signups.')
    )
    .setFooter({text:'SOLARA  •  LIVE RAID BOARD  •  ' + BOARD_MARKER})
    .setTimestamp();

  for (const message of active.slice(0, MAX_RAIDS)) {
    const raid = message.embeds[0];
    const memberField = raid.fields.find(f => f.name.startsWith('Members ('));
    const roster = memberField?.name.match(/\((\d+\/\d+)\)/)?.[1] || 'Unknown';
    const when = raid.fields.find(f => f.name === 'When')?.value || 'To be announced';
    const leader = raid.fields.find(f => f.name === 'Organizer')?.value || 'To be assigned';
    const classes=raid.fields.find(f=>f.name==='Raid Classes')?.value||'';
    const counts=new Map();
    for(const line of classes.split('\\n')){
      const match=/^<@!?\\d+> — (.+)$/.exec(line);
      if(match)counts.set(match[1],(counts.get(match[1])||0)+1);
    }
    const summary=counts.size?[...counts].map(([name,count])=>name+' ×'+count).join(' · '):'Not selected yet';
    board.addFields({
      name:'☀️  ' + raid.title.slice('⚔️ Raid: '.length).slice(0,100),
      value:
        '**Schedule**  ·  ' + when.slice(0,120) + '\n' +
        '**Roster**  ·  ' + roster + '\n' +
        '**Leader**  ·  ' + leader + '\n' +
        '**Classes**  ·  ' + summary.slice(0,400) + '\n' +
        '[View raid & sign up](' + message.url + ')'
    });
  }

  if (active.length > MAX_RAIDS) {
    board.addFields({
      name:'✧  MORE UPCOMING RAIDS',
      value:(active.length - MAX_RAIDS) + ' more open raids in ' + signups.toString()
    });
  }
  board.addFields({
    name:'✦  ANSWER THE CALL',
    value:'View the raid roster and join upcoming battles in ' + signups.toString() + '.'
  });
  return board;
}

export async function updateLiveRaidBoard(guild) {
  const events = guild.channels.cache.find(c => c.name === 'guild-events' && c.isTextBased());
  const signups = guild.channels.cache.find(c => c.name === 'raid-signups' && c.isTextBased());
  if (!events || !signups) return;

  const raids = (await raidListings(signups)).sort((a,b) => a.createdTimestamp - b.createdTimestamp);
  for(const message of raids){
    if(message.embeds[0].title.includes(' — CLOSED')||message.components.some(row=>row.components.some(button=>button.customId==='raid:class')))continue;
    const rows=message.components.map(row=>ActionRowBuilder.from(row));
    if(rows.length&&rows[0].components.length<5){rows[0].addComponents(new ButtonBuilder().setCustomId('raid:class').setLabel('Set Class').setStyle(ButtonStyle.Secondary));await message.edit({components:rows}).catch(e=>console.warn('Could not add raid class control',e.message));}
  }
  const embed = makeBoard(raids, signups);
  const history = await events.messages.fetch({limit:100});
  const boards = [...history.values()]
    .filter(m => m.author.id === events.client.user.id &&
      (m.content.startsWith(LEGACY_HEADING) ||
       m.embeds.some(e => e.footer?.text?.includes(BOARD_MARKER))))
    .sort((a,b) => a.createdTimestamp - b.createdTimestamp);

  const payload = {content:'', embeds:[embed], components:[], allowedMentions:{parse:[]}};
  if (boards.length) {
    await boards[0].edit(payload);
    for (const extra of boards.slice(1)) {
      await extra.delete().catch(e => console.warn('Duplicate raid board cleanup failed:',e.message));
    }
  } else {
    await events.send(payload);
  }
}
