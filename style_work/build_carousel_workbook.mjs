import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
import {days,rules} from './carousel_data.mjs';

const output='/home/angsuman/extra_spac/AXOMRANK/outputs/axomrank_4_day_carousels';
const work='/home/angsuman/extra_spac/AXOMRANK/style_work';
await fs.mkdir(output,{recursive:true});await fs.mkdir(path.join(work,'qa'),{recursive:true});
const colours={maroon:'#80151A',charcoal:'#292929',ivory:'#F7F2EC',white:'#FFFFFF',green:'#3F6B4F'};
const logo=await fs.readFile('/tmp/AxomRank_Brand_Identity_Guide_image.jpg');
await fs.writeFile(path.join(work,'rang_ghar_original.jpg'),logo);
const logoUrl='data:image/jpeg;base64,'+logo.toString('base64');
const xml=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const text=(x,y,lines,size=30,fill=colours.charcoal,weight=400)=>`<text x="${x}" y="${y}" fill="${fill}" font-family="Noto Sans,Arial,sans-serif" font-size="${size}" font-weight="${weight}">${lines.map((t,i)=>`<tspan x="${x}" dy="${i?size*1.2:0}">${xml(t)}</tspan>`).join('')}</text>`;
const weave=(x,y,width,colour=colours.maroon)=>{
 let s=`<path d="M${x} ${y}H${x+width} M${x} ${y+18}H${x+width}" stroke="${colour}" stroke-width="2"/>`;
 for(let xx=x+10;xx<x+width-5;xx+=22)s+=`<path d="M${xx} ${y+3}l6 6-6 6-6-6Z" fill="${colour}"/>`;
 return s;
};
const card=(x,fill)=>`<rect x="${x}" y="305" width="408" height="510" rx="0" fill="${fill}" stroke="#D8CCC3" stroke-width="1.5"/>`;
const river=(x,y)=>`<path d="M${x} ${y}c80-38 116 42 196 4s118-32 152-6" stroke="${colours.maroon}" stroke-width="3" fill="none"/>`;
let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="940" viewBox="0 0 1800 940"><rect width="1800" height="940" fill="#FFFFFF"/>`;
svg+=text(48,86,['AXOMRANK'],58,colours.maroon,700);
svg+=text(48,128,['ASSAM STUDY JOURNAL'],26,colours.charcoal,500);
svg+=text(48,162,['Warm learning pages. Woven accents. One clear task.'],21,'#68605A');
const swatches=[['Maroon',colours.maroon],['Charcoal',colours.charcoal],['Ivory',colours.ivory],['White',colours.white],['Correct answer',colours.green]];
swatches.forEach(([label,hex],i)=>{let x=48+i*343;svg+=`<rect x="${x}" y="190" width="306" height="35" fill="${hex}" stroke="#D8CCC3"/>`;svg+=text(x,251,[`${label}  ${hex}`],18);});
const xs=[48,480,912,1344];
['DAY 1  •  TOFU','DAY 2  •  MOFU','DAY 3  •  TOFU','DAY 4  •  BOFU'].forEach((label,i)=>svg+=text(xs[i],287,[label],18,colours.maroon,700));
svg+=card(xs[0],colours.ivory)+card(xs[1],colours.ivory)+card(xs[2],colours.white)+card(xs[3],colours.maroon);
for(let i=0;i<4;i++)svg+=text(xs[i]+28,347,['AXOMRANK'],15,i===3?colours.ivory:colours.maroon,700);

// Cover 1: simple editorial notebook and cup, not a fabricated student photograph.
svg+=text(76,419,['The day ends.','Your practice','begins.'],34,colours.maroon,700);
svg+=text(76,555,['One small task for tonight.'],18);
svg+=`<g stroke="${colours.charcoal}" stroke-width="2.5" fill="none"><path d="M105 618q66-22 130 2v130q-65-20-130 0Z" fill="#FFFFFF"/><path d="M235 620q67-22 130-2v132q-65-20-130 0Z" fill="#FFFFFF"/><path d="M235 620v130"/><path d="M122 643h92 M122 663h85 M254 643h90 M254 663h70" stroke="#BDAEA2"/><ellipse cx="369" cy="620" rx="26" ry="9" fill="#FFFFFF"/><path d="M343 620v37q26 14 52 0v-37 M395 628q25 0 21 19-5 13-21 7"/></g>`;
svg+=`<rect x="305" y="615" width="20" height="95" fill="${colours.ivory}" stroke="${colours.maroon}"/>`+weave(308,686,14);
svg+=weave(76,778,352);

// Cover 2: all values are original illustrative maths amounts.
svg+=text(508,419,['Up 20%.','Down 20%.','Back to ₹100?'],34,colours.maroon,700);
svg+=text(508,555,['Choose before you swipe.'],18);
svg+=`<rect x="532" y="601" width="123" height="62" fill="${colours.maroon}"/><rect x="700" y="601" width="123" height="62" fill="${colours.maroon}"/>`;
svg+=text(554,643,['+20%'],26,colours.white,700)+text(723,643,['−20%'],26,colours.white,700);
svg+=river(508,697)+text(530,751,['₹100'],33,colours.charcoal,700)+text(752,751,['?'],33,colours.maroon,700);
svg+=weave(508,778,352);

// Cover 3: preserve the supplied brand artwork without reconstructing the architecture.
svg+=text(940,419,['You know the','silhouette.','Name its town.'],34,colours.maroon,700);
svg+=`<image href="${logoUrl}" x="940" y="554" width="350" height="233.333" preserveAspectRatio="xMidYMid meet"/>`;
svg+=weave(940,790,352);

// Cover 4 is explicitly a layout reference; no interface or score is invented.
svg+=text(1372,419,['Your next','practice task','starts here.'],34,colours.ivory,700);
svg+=`<rect x="1462" y="553" width="171" height="202" rx="15" fill="${colours.ivory}" stroke="${colours.ivory}" stroke-width="2"/><rect x="1474" y="568" width="147" height="170" fill="#FFFFFF" stroke="#A9988A"/><line x1="1515" y1="747" x2="1580" y2="747" stroke="${colours.maroon}" stroke-width="3"/>`;
svg+=text(1490,624,['REAL SCREEN','GOES HERE'],14,colours.maroon,700);
svg+=text(1488,693,['Verified capture'],12,colours.charcoal);
svg+=text(1372,790,['Start the shown set.'],19,colours.ivory,600);
svg+=text(48,863,['Four cover layout references. Use the complete copy and slide directions in the workbook.'],20,'#68605A');
svg+=text(48,898,['The woven edge is an abstract design accent. Day 4 needs actual screenshots before publication.'],19,'#68605A');
svg+='</svg>';
await fs.writeFile(path.join(work,'style_reference.svg'),svg);
const board=await sharp(Buffer.from(svg)).png().toBuffer();
await fs.writeFile(path.join(work,'style_reference.png'),board);

const wb=Workbook.create();
const plan=wb.worksheets.add('4 Day Plan');
const slides=wb.worksheets.add('Slide by Slide');
const style=wb.worksheets.add('Visual Style');
function base(sheet,last,lastRow,widths,title,subtitle){
 sheet.showGridLines=false;
 sheet.getRange(`A1:${last}${lastRow}`).format={font:{name:'Arial',size:11,color:colours.charcoal},verticalAlignment:'top',wrapText:true};
 widths.forEach((w,i)=>sheet.getRangeByIndexes(0,i,lastRow,1).format.columnWidthPx=w);
 sheet.getRange('A2').values=[[title]];sheet.getRange('A2').format={font:{name:'Arial',size:16,bold:true,color:colours.charcoal},wrapText:false};
 sheet.getRange(`A2:${last}2`).format.rowHeight=30;
 sheet.getRange('A3').values=[[subtitle]];sheet.getRange('A3').format={font:{name:'Arial',size:11,italic:true,color:'#68605A'},wrapText:false};
 sheet.getRange(`A3:${last}3`).format.rowHeight=28;
}
function header(sheet,range){sheet.getRange(range).format={fill:colours.maroon,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},wrapText:true,horizontalAlignment:'center',verticalAlignment:'center',rowHeight:40};sheet.getRange(range).format.borders={insideVertical:{style:'thin',color:'#FFFFFF'}};}
function table(sheet,last,count,name){const t=sheet.tables.add(`A5:${last}${count+5}`,true,name);t.showFilterButton=true;header(sheet,`A5:${last}5`);for(let r=6;r<=count+5;r++)sheet.getRange(`A${r}:${last}${r}`).format.fill=r%2===0?'#FFFFFF':colours.ivory;sheet.freezePanes.freezeRows(5);sheet.freezePanes.freezeColumns(1);}

base(plan,'O',23,[90,60,85,180,300,310,440,340,350,520,300,540,300,85,170],'AxomRank Four Day Carousel Plan','One carousel per day • six slides each • Day 1–4 are sequence labels • exact copy is on Slide by Slide');
plan.tabColor=colours.maroon;
plan.getRange('A5:O5').values=[['Carousel ID','Day','Funnel','Series','Post title','Cover wording','Visual hook','Learning payoff','Single CTA','Caption','Hashtags','Assets and publication prerequisites','What to measure','Slides','Source IDs']];
plan.getRange('A6:O9').values=days.map(d=>[d.id,d.day,d.stage,d.series,d.title,d.hook,d.visual,d.takeaway,d.cta,d.caption,d.tags,d.assets,d.measure,d.slides.length,d.source]);
table(plan,'O',4,'AxomRankFourDayPlan');plan.getRange('A6:O9').format.rowHeight=155;
plan.getRange('F6:G9').format.font={name:'Arial',size:11,bold:true,color:colours.maroon};
plan.getRange('B6:C9').format.horizontalAlignment='center';plan.getRange('N6:N9').setNumberFormat('0');
plan.getRange('C6:C9').conditionalFormats.add('containsText',{text:'TOFU',format:{fill:'#EEE4D6',font:{bold:true,color:'#5C4933'}}});
plan.getRange('C6:C9').conditionalFormats.add('containsText',{text:'MOFU',format:{fill:'#E6EFE8',font:{bold:true,color:colours.green}}});
plan.getRange('C6:C9').conditionalFormats.add('containsText',{text:'BOFU',format:{fill:'#F4E3E4',font:{bold:true,color:colours.maroon}}});
plan.getRange('A12').values=[['Four-post funnel mix']];plan.getRange('A12').format={font:{bold:true,size:13},wrapText:false};
plan.getRange('A13:D13').values=[['Funnel','Posts','Share','20-post target']];header(plan,'A13:D13');
plan.getRange('A14:A16').values=[['TOFU'],['MOFU'],['BOFU']];
plan.getRange('B14').formulas=[['=COUNTIFS($C$6:$C$9,A14)']];plan.getRange('B14:B16').fillDown();
plan.getRange('C14').formulas=[['=B14/SUM($B$14:$B$16)']];plan.getRange('C14:C16').fillDown();plan.getRange('C14:C16').setNumberFormat('0%');
plan.getRange('D14:D16').values=[[10],[6],[4]];plan.getRange('A14:D16').format.rowHeight=28;
plan.getRange('F13').values=[['A four-post run uses 2 TOFU, 1 MOFU and 1 BOFU (50/25/25). For an exact 50/30/20 cycle of 20 posts, the next 16 need 8 TOFU, 5 MOFU and 3 BOFU.']];plan.getRange('F13:H15').merge();plan.getRange('F13:H15').format={wrapText:true,verticalAlignment:'top',font:{name:'Arial',size:11,color:'#68605A'}};
plan.getRange('A19').values=[['Total slides']];plan.getRange('B19').formulas=[['=SUM(N6:N9)']];
plan.getRange('F18').values=[['Publication sequence: recognise the study moment → judge the teaching → connect with Assam → begin a real practice task.']];plan.getRange('F18:H20').merge();plan.getRange('F18:H20').format={wrapText:true,verticalAlignment:'top'};

base(slides,'O',29,[90,60,70,110,340,500,205,520,480,260,230,540,360,510,690],'AxomRank Carousel Slide Copy and Design','24 cards • headlines, body copy and options are publishable text • layout references L1–L5 and motifs M1–M4 are defined in Visual Style');
slides.tabColor=colours.charcoal;
slides.getRange('A5:O5').values=[['Carousel ID','Day','Slide','Role','Exact headline','Exact body copy','Exact options','Visual direction','Layout direction','Assam element','Colour treatment','Assets and checks','Fact/source note','Alt text','Artwork brief']];
const slideRows=[];
for(const d of days)for(let i=0;i<d.slides.length;i++){
 const [role,headline,body,options,visual,layout,motif,palette,assets,source,alt]=d.slides[i];
 const art=`Create only the non-text artwork for a 1080×1350 AxomRank card. ${visual} Use ${palette.toLowerCase()} with flat editorial line art and generous space. ${motif}. Keep the headline/body area empty for editable typesetting. Never recreate the supplied logo, invent a product screen, or add extra words/numbers. ${d.stage==='BOFU'?'Use real screenshots as placed assets; a blank layout slot is for planning only.':''}`;
 slideRows.push([d.id,d.day,i+1,role,headline,body,options||'—',visual,layout,motif,palette,assets,source,alt,art]);
}
slides.getRange('A6:O29').values=slideRows;table(slides,'O',24,'AxomRankCarouselSlides');slides.getRange('A6:O29').format.rowHeight=125;
slides.getRange('E6:E29').format.font={name:'Arial',size:11,bold:true,color:colours.maroon};
slides.getRange('B6:C29').setNumberFormat('0');slides.getRange('B6:C29').format.horizontalAlignment='center';
for(const row of [11,17,23])slides.getRange(`A${row}:O${row}`).format.borders={bottom:{style:'medium',color:'#BFAEA2'}};

base(style,'D',85,[250,180,670,310],'AxomRank Visual Style','Assam Study Journal • brand colours and unchanged heritage artwork • concrete layout rules and embedded cover references');
style.tabColor='#AD8B79';
style.getRange('A5:D5').values=[['Colour role','Hex value','Application','Text pairing']];header(style,'A5:D5');
style.getRange('A6:D10').values=[
 ['Primary maroon',colours.maroon,'Headlines, emphasis, woven edges, wordmark and CTA areas.','White or ivory on maroon'],
 ['Charcoal',colours.charcoal,'Body copy, question options and careful line illustration.','Charcoal on ivory or white'],
 ['Warm ivory',colours.ivory,'Default learning page. Keep texture faint and optional.','Charcoal or maroon on ivory'],
 ['White',colours.white,'Clean screenshot panels and original Rang Ghar artwork background.','Charcoal or maroon on white'],
 ['Muted green',colours.green,'Correct answers and completed steps, with an explicit text label.','White text on green; green labels on white']
];
style.getRange('A6:D10').format.rowHeight=42;
const hexValues=[colours.maroon,colours.charcoal,colours.ivory,colours.white,colours.green];
hexValues.forEach((hex,i)=>style.getRange(`B${i+6}`).format={fill:hex,font:{name:'Arial',size:11,bold:true,color:[0,1,4].includes(i)?'#FFFFFF':colours.charcoal},verticalAlignment:'center',horizontalAlignment:'center'});
style.getRange('A13:D13').values=[['Style element','Token / value','How to apply','Used for']];header(style,'A13:D13');
style.getRange('A14:D31').values=rules;style.getRange('A14:D31').format.rowHeight=50;
for(let r=14;r<=31;r++)style.getRange(`A${r}:D${r}`).format.fill=r%2===0?colours.ivory:'#FFFFFF';
style.getRange('A34').values=[['Cover layout references']];style.getRange('A34').format={font:{name:'Arial',size:14,bold:true},wrapText:false};
style.getRange('A35').values=[['The board demonstrates the visual language. Use the exact copy in Slide by Slide when producing the final cards.']];style.getRange('A35').format={font:{name:'Arial',size:11,italic:true,color:'#68605A'},wrapText:false};
style.getRange('A36:D64').format.rowHeight=20;
style.images.add({dataUrl:'data:image/png;base64,'+board.toString('base64'),anchor:{from:{row:36,col:0},extent:{widthPx:1360,heightPx:710.222}}});
style.getRange('A66:D66').values=[['Layout ID','Name','Composition','Usage']];header(style,'A66:D66');
style.getRange('A67:D71').values=[
 ['L1','Cover','One short hook in upper half, one hero image below, fixed header/footer.','Slides 1'],
 ['L2','Context / pairing','A short statement with two clear fields or a large image and compact explanation.','Study steps / facts'],
 ['L3','Attempt','Question first; evenly spaced neutral options; answer withheld until a later card.','Question slides'],
 ['L4','Explanation','Working in aligned lines above a simple truthful diagram; explicit answer label.','Method / recall slides'],
 ['L5','Single CTA','One useful action in large text; secondary brand line smaller; no competing request.','Slides 6']
];style.getRange('A67:D71').format.rowHeight=40;
style.getRange('A74:D74').values=[['Source ID','Source','Location','Supports']];header(style,'A74:D74');
style.getRange('A75:D78').values=[
 ['B1','Brand identity guide','Supplied AxomRank Brand Identity Guide, October 2026.','Palette, typography, logo rules, language standard and tagline.'],
 ['B2','Instagram strategy','Supplied AxomRank Instagram Content Strategy for Assam, 9 October 2026.','Funnel, series, one CTA and respectful teaching.'],
 ['S1','Sivasagar district','https://sivasagar.assam.gov.in/index.php/tourist-place-detail/276','Rang Ghar location and recreation/sports purpose.'],
 ['S2','Chirang district','https://chirang.assam.gov.in/information-and-services/traditioal-attire','Gamosa red-and-white woven-border reference. Abstract accent is a new design.']
];style.getRange('A75:D78').format.rowHeight=58;

if(days.length!==4||slideRows.length!==24||days.some(d=>d.slides.length!==6))throw Error('Required four carousels with six cards each');
if(slideRows.some(r=>!r[4]||!r[5]||!r[7]||!r[13]))throw Error('Incomplete copy, visuals or alt text');
// Check legibility-oriented copy limits; multiline arithmetic is intentionally compact.
for(const r of slideRows)if(r[5].split(/\s+/).length>40)throw Error(`Body too long ${r[0]}/${r[2]}`);
wb.recalculate();
console.log((await wb.inspect({kind:'table',range:"'4 Day Plan'!A13:D16",include:'values,formulas',tableMaxRows:4,tableMaxCols:4,maxChars:1600})).ndjson);
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!',options:{useRegex:true,maxResults:20},summary:'Final formula errors'})).ndjson);
const filename=path.join(output,'AxomRank_Assam_Visual_Style_and_4_Day_Carousel_Plan.xlsx');
const xlsx=await SpreadsheetFile.exportXlsx(wb);await xlsx.save(filename);
for(const [sheetName,range,file] of [
 ['4 Day Plan','D5:G7','plan_hooks.png'],
 ['Slide by Slide','D5:I7','slide_copy.png'],
 ['Visual Style','A2:D10','style_palette.png'],
 ['Visual Style','A34:D64','style_board_embedded.png'],
 ['Visual Style','A13:D20','style_rules.png'],
 ['Slide by Slide','L23:O25','product_prerequisites.png']
]){
 const p=await wb.render({sheetName,range,scale:1,format:'png'});await fs.writeFile(path.join(work,'qa',file),new Uint8Array(await p.arrayBuffer()));
}
console.log(JSON.stringify({file:filename,days:days.length,slides:slideRows.length,embeddedBoard:true}));
