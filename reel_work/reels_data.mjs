// Each record: stage, idea, pillar, alternate verbal hook, five narration beats,
// five visual beats, five text beats, filming prerequisite, caption hook, keywords.
export const chapters = [[], [], []];
const add = (c, ...r) => chapters[c-1].push(r);

add(3,'TOFU','The calendar square after a gap','Aspirant life','You can put a task in today’s square.',
'There is a gap on the calendar.|You can choose today’s task without filling yesterday’s square with an invented session.|Open one question from the topic you meant to practise. Attempt it, check the reasoning, and write the next question number beside today’s date.|Keep the record honest. A specific restart gives this evening a beginning and tomorrow a place to continue.|Share this with someone restarting their practice.',
'Pencil hovers over blank calendar squares.|Write today’s task beside real date.|Attempt one original question on fresh page.|Leave previous gaps blank; note next question.|Close on honest calendar and open notebook.',
'AFTER A GAP|Choose today’s task|Attempt and review|Record the next question|Share a restart',
'Use a demonstration calendar; do not fabricate streaks or claim guaranteed habit improvement.','Today’s square can hold a real task.','study restart, exam practice, student life');
add(3,'TOFU','The decimal point moved','Everyday maths','Half and five hundredths are different.',
'That dot changed the value.|Compare zero point five with zero point zero five before the cards turn.|Zero point five is five tenths, or half. Zero point zero five is five hundredths. The first value is ten times the second.|Read the place value before choosing an option. Keep the extra zero visible when you copy the question into your notebook.|Comment which value is larger.',
'Slide a decimal point between0.5 and0.05 cards.|Hold both values with larger/smaller prompt.|Shade50 versus5 cells in two hundred-grids.|Write0.5=10×0.05 with zeros circled.|Reset decimal cards for loop.',
'THE DOT MATTERS|0.5 or 0.05?|5 tenths • 5 hundredths|0.5 is ten times 0.05|Which is larger?',
'Original practice; represent both grids out of100 cells.','One extra zero changes the place value.','decimals, maths quiz, original practice');
add(3,'TOFU','The timer rang before the review','Study habits','The timer rang. Leave a review marker.',
'The timer rang before your review.|Your attempt is finished, but one explanation still needs attention.|Mark that question and write what confused you before closing the page. Set a separate review window you can actually keep, instead of losing the question in the completed set.|When that window arrives, the marked step tells you where to begin. Keep the attempt and review connected.|Send this to your timed-practice partner.',
'Timer sounds; hand starts closing notebook.|Stop at an unreviewed question.|Write “review denominator” and bookmark.|Place review-window slip beside question.|Return to timer with bookmark now ready.',
'TIMER FINISHED|Review still waiting|Mark the confusing step|Choose a review window|Send to your partner',
'Demonstration timer; no invented test or productivity result.','The end of the timer can leave a useful review marker.','timed practice, mock review, study habits');
add(3,'TOFU','A note to tomorrow’s self','Aspirant life','Tomorrow needs a question number, not a speech.',
'Tomorrow needs this question number.|Before putting the notebook away, look at the point where you stopped.|Write the topic, question number, and the step you want to check. Put that slip inside the page, with your pencil beside it if the space allows.|When you return, you can open the intended task directly. The note keeps the next start specific to your own session.|Share this with your tomorrow-study friend.',
'Fold a long motivational note into a small numbered slip.|Show current stopping line.|Write topic/question/step on slip.|Insert slip at exact page; reopen directly.|Close on short slip replacing long note.',
'WRITE THE QUESTION NUMBER|Where did you stop?|Topic • question • step|Open the intended page|Share the restart note',
'Creator demonstration; do not claim this changes scores or saves a fixed amount of time.','Write tomorrow a starting point it can use.','study planning, revision, student routine');
add(3,'TOFU','The GK cards got shuffled','Assam GK','These two labels landed on the wrong cards.',
'These labels landed on wrong cards.|Rang Ghar and Majuli have lost the matching place clues in this shuffle.|Put Sivasagar with Rang Ghar and Brahmaputra with Majuli. One pair connects a monument to its town; the other connects a river island to its river.|Read the kind of relationship the question asks for before matching. Familiar names can still belong to different categories.|Comment the pair you matched first.',
'ShuffleSivasagar/Brahmaputra labels under two images.|Show incorrect pairings without green answer cue.|Move labels to RangGhar–Sivasagar, Majuli–Brahmaputra.|Add “town” versus “river” relationship labels.|Shuffle again, ending before answer.',
'FIX THE MATCH|Rang Ghar • Majuli|Sivasagar • Brahmaputra|Town or river?|Which pair first?',
'Sources S1 and S4. Make deliberately wrong pairings visibly a question, never a standalone fact card.','The clue asks for a relationship, not just a familiar name.','Assam GK, Rang Ghar, Majuli');
add(3,'TOFU','A quarter hour on the clock','Quick challenge','A quarter of this hour is how long?',
'A quarter hour. How many minutes?|The clock face gives you a whole hour to divide.|One hour contains sixty minutes. Split those minutes into four equal parts, and each part contains fifteen. That is why a quarter hour is fifteen minutes.|Now compare it with half an hour, which is thirty minutes. Keep the whole and the fraction labelled on your clock.|Comment the minutes before the reveal.',
'Cover three quadrants of a clock face.|Show question “¼ hour = ? minutes”.|Write60÷4=15 and reveal one quadrant.|Show half-clock30 beside quarter15.|Replace covers for opening loop.',
'A QUARTER HOUR|1 hour = 60 minutes|60 ÷ 4 = 15|Half hour = 30|How many minutes?',
'Original unit/fraction practice; do not confuse quarter-hour duration with clock time.','The clock face contains a fraction question.','time conversion, fractions, quick quiz');
add(3,'TOFU','Someone keeps the room quiet','Community story','A small favour can protect a study window.',
'Someone kept this corner quiet.|The session begins with an ordinary favour: a quieter room for a short attempt.|Show an adult aspirant completing one question while another person handles a small interruption. After checking the explanation, the learner writes the next task and thanks that person.|Keep the story specific and familiar. The contribution is time and space for a real practice action.|Send this to someone who supports your study.',
'Hand gently lowers television-volume control.|Consenting adults agree on a short study window.|Creator attempts one original question; second person quietly helps.|Learner notes next task and offers simple thanks.|End with notebook in the same shared room.',
'A SMALL FAVOUR|A short study window|One question attempted|Thank your support person|Send them this',
'Staged scene with consenting adults; adapt to real relationship, no guilt or gendered chore assumptions.','Some support looks like a quieter room.','study support, Assam students, community');
add(3,'TOFU','Two scores with the same average','Everyday maths','Same average. Very different score pairs.',
'Same average. Different score pairs.|This original example compares ten and thirty with nineteen and twenty-one.|Both pairs total forty across two values, so both averages are twenty. But one pair has a twenty-point gap, while the other has only two.|An average describes one feature of the data. Look at the individual values too before deciding what the result tells you.|Share this average question with a friend.',
'Balance10/30 and19/21 cards on two trays.|Display “same average?” before reveal.|Show40÷2=20 under each.|Stretch gap markers20versus2.|End on matched averages with values visible.',
'SAME AVERAGE?|10, 30 • 19, 21|Both average 20|Gaps: 20 and 2|Share the comparison',
'Invented example scores; no claims about actual learner performance.','An average does not show every detail.','average, data interpretation, maths');
add(3,'TOFU','The rule card changes','Quick reasoning','Read the rule before continuing this series.',
'The rule card changed again.|These number cards need the instruction sitting above them.|Start with three and add five each time: three, eight, thirteen, eighteen. The next value is twenty-three because we apply the same stated rule once more.|If the rule changes, the continuation may change too. Use the instruction provided instead of forcing a pattern from another question.|Comment the next number before the reveal.',
'Flip rule card from blank to “add5”.|Arrange3,8,13,18,?.|Draw+5 arrows and reveal23.|Hold a different rule card away from this sequence.|Hide23 and return to “add5”.',
'READ THE RULE|Add 5 each time|3, 8, 13, 18, ?|Next = 23|Your next number?',
'Original sequence with explicit rule; avoid suggesting uniqueness without the rule.','The instruction belongs above the number pattern.','number series, reasoning, original practice');
add(3,'TOFU','A local sign becomes a question','Community and place','This familiar sign can start a lesson.',
'A familiar sign can start a question.|Film a place name your audience recognises, with permission where needed.|Ask viewers what they want to know about the name or institution. Choose one precise question, check an appropriate official source, and keep the spelling alongside the answer.|The finished lesson should explain the connection you verified. A good-looking sign still needs a fact worth learning.|Comment a sign or name to investigate.',
'Focus-pull from creator notebook to actual place sign.|Show correct local spelling and location.|Write a question field with answer left blank.|Show source-to-answer workflow diagram.|Return to sign with viewer suggestion prompt.',
'A FAMILIAR SIGN|Name it accurately|Ask → check → explain|One verified connection|Which name next?',
'Invitation/workflow, not an invented etymology. Film permitted real sign; source any later factual episode.','Which familiar name deserves a properly checked explanation?','Assam places, local knowledge, community');
add(3,'TOFU','The notebook margin tells the story','Study habits','This tiny note explains the wrong answer.',
'Look at the notebook margin.|The answer looked close, but the margin shows where the method drifted.|In this original example, one metre was treated as one centimetre during subtraction. Rewrite one metre as one hundred centimetres, then subtract the fifty centimetres asked for.|The corrected answer is fifty centimetres. A short unit label can make the missing step visible when you revisit the page.|Share this with your unit-mixing friend.',
'Macro shot of tiny “units?” note beside wrong working.|Pull focus to1m−50cm.|Rewrite100cm−50cm.|Reveal50cm; circle both unit labels.|Return macro shot to corrected margin.',
'CHECK THE MARGIN|1 m − 50 cm|100 cm − 50 cm|Answer = 50 cm|Share the unit check',
'Original practice; notebook labelled creator demonstration.','A small margin note can point to a specific error.','units, maths mistake, study notebook');
add(3,'TOFU','Guess what is under the rectangle','Quick challenge','Inside or around? Choose before it opens.',
'Inside or around? Choose first.|The card hides a rectangle four centimetres long and three centimetres wide.|If the question asks how much surface it covers, calculate four times three: twelve square centimetres. If it asks the boundary length, add every side: fourteen centimetres.|The picture stays the same while the requested quantity changes. Point to the wording before you choose a number.|Comment “inside” or “around” with your answer.',
'Lift card edge to reveal part of rectangle.|Show4cm/3cm labels and two wording cards.|Reveal shaded12cm² and boundary14cm.|Switch wording cards over same rectangle.|Lower cover to first-frame position.',
'INSIDE OR AROUND?|Same rectangle|Area 12 cm² • perimeter 14 cm|Read the requested quantity|Comment your choice',
'Original challenge; prompt viewers to specify which quantity their answer addresses.','A single diagram can ask two different questions.','area, perimeter, quick challenge');
add(3,'TOFU','The friend explains a correction','Community','Ask your friend what they changed.',
'Show the step you changed.|Two practice partners bring their corrected workings to the table.|One changed a percentage base; the other counted all five ratio parts. Each explains the correction before looking at the partner’s new question, then attempts that question independently.|A useful exchange gives both people a method to check. Keep the corrections specific and the new answers hidden until they attempt.|Send this to your review partner.',
'Two hands swap corrected notebook pages.|Show labelled percentage and ratio errors.|Both explain highlighted step, then swap new question cards.|Split-screen independent attempts.|Return to corrected pages and partner prompt.',
'SHOW THE CORRECTION|Two different mistakes|Explain the changed step|Attempt the new question|Send to your partner',
'Consenting adult performers; use original examples and no claimed real learner progress.','Compare corrections that you can actually explain.','study partners, correction, community');
add(3,'TOFU','The creator catches their own typo','Brand trust','Watch this option get corrected openly.',
'This option needs a correction.|We are demonstrating how AxomRank should handle an error, using a labelled sample card.|The working says fifteen percent of two hundred equals thirty, but the sample answer label points to twenty. Change the label and show exactly what was corrected.|Keep the explanation and answer aligned, then make the correction visible wherever the sample appeared. Students need the corrected version for revision.|Save this answer-check reminder.',
'Red circle lands on deliberately wrong sample answer label.|Show prominent “correction demonstration” label.|Correct option to30 while retaining working.|Display before/after and clear correction sentence.|End on correct card and answer-check prompt.',
'CHECK THIS LABEL|Correction demonstration|15% of 200 = 30|Answer and working agree|Save the reminder',
'Deliberately staged error must be labelled demonstration throughout; never invent a past publishing incident.','The correction should be as visible as the answer.','AxomRank, answer checking, teaching trust');
add(3,'TOFU','One new question after the series','Brand continuity','This series ends with your next attempt.',
'The next question is already waiting.|We have used familiar study moments to make a practice task easier to recognise.|Try this new original question: twenty-five percent of one hundred twenty. A quarter of one hundred twenty is thirty, so that is the answer. Keep your working before the reveal.|The next series can begin from the topic you want explained. Bring a specific question and we can build from it.|Comment your next topic request.',
'Turn final-series page to reveal fresh question.|Brief montage of desk, cards and notebook.|Show25%of120 with pause; reveal120÷4=30.|Put viewer-request box beside new page.|End on an unanswered next-topic card.',
'ONE MORE ATTEMPT|25% of 120|120 ÷ 4 = 30|What should come next?|Comment a topic',
'Original practice; do not claim 90 posts have actually been published if this episode runs earlier.','The next series can start with your question.','AxomRank, topic requests, practice');

add(3,'MOFU','Speed needs distance and time','Maths explanation','Sixty kilometres took two hours.',
'Sixty kilometres. Two hours. Find speed.|This original journey example asks for average speed in kilometres per hour.|Divide the total distance, sixty kilometres, by the total time, two hours. The result is thirty kilometres per hour. Keep the units in that fraction so the answer describes a rate.|Changing either quantity changes the calculation. Read the total journey details before choosing the operation.|Save this distance-over-time example.',
'Move paper bus along60km route beneath2h clock.|Show “average speed=?”.|Write60km÷2h=30km/h.|Highlight distance/time units beside rate.|Return bus to route start.',
'DISTANCE AND TIME|60 km in 2 hours|60 ÷ 2 = 30 km/h|Read the whole journey|Save the rate method',
'Original simplified journey; no actual route time or transport schedule implied.','The units explain the rate you calculated.','speed distance time, arithmetic, explanation');
add(3,'MOFU','Half an hour is not point five minutes','Maths explanation','Point five hours needs a unit conversion.',
'Point five hours is thirty minutes.|The decimal tells you the fraction of an hour, not the minute count.|Multiply zero point five by sixty minutes per hour. That gives thirty minutes. If the value were zero point two five hours, the same conversion would give fifteen minutes.|Write the original unit before multiplying. The conversion factor belongs between the two units you are changing.|Save this hours-to-minutes method.',
'Move0.5 card from HOURS label towards MINUTES.|Show question0.5h=?min.|Write0.5×60=30; then0.25×60=15.|Draw unit bridge hours→×60→minutes.|Highlight original HOURS label.',
'CHECK THE UNIT|0.5 hours|0.5 × 60 = 30 minutes|0.25 hours = 15 minutes|Save the conversion',
'Original unit conversion; answer30min, not0.5min.','The same decimal can describe different units.','time conversion, decimals, arithmetic');
add(3,'MOFU','Undo the plus seven','Maths explanation','Keep both sides equal when you undo it.',
'Undo seven on both sides.|This original equation says x plus seven equals twelve.|Subtract seven from the left side and from the right side. The left becomes x, and the right becomes five, so x equals five. Both sides stay equal through the same operation.|Check by putting five back into the original equation. Five plus seven equals twelve, so the value fits.|Save this equation-and-check method.',
'Remove seven tokens from both balance trays.|Showx+7=12.|Write−7 on each side and revealx=5.|Substitute5+7=12 on original line.|Return tokens beside equation.',
'BOTH SIDES|x + 7 = 12|Subtract 7 → x = 5|Check: 5 + 7 = 12|Save the method',
'Original equation; visual balance is illustrative, not a physical proof setup.','The same operation keeps both sides equal.','basic algebra, original practice, equations');
add(3,'MOFU','One red token in four','Maths explanation','Count every token before the probability.',
'One red token. Four altogether.|This original example chooses one token uniformly at random from this bag.|There is one red token and three blue tokens, so the total is four. The probability of choosing red is one favourable outcome divided by four equally likely outcomes: one quarter.|Count all possible tokens before writing the denominator. The bag’s colour labels keep the favourable outcome visible.|Save this one-out-of-four example.',
'Drop one red and three blue tokens into clear bag.|Show “one random draw” label.|Count4; shade1/4 probability strip.|Circle1red numerator and4total denominator.|Pour tokens out to verify count.',
'COUNT ALL FOUR|1 red • 3 blue|P(red) = 1 ÷ 4|One quarter = 25%|Save the example',
'Original probability; explicitly state uniform random choice and single draw.','The denominator counts every possible token.','probability, fractions, maths explanation');
add(3,'MOFU','Forty out of fifty becomes a percentage','Maths explanation','The total is fifty, not one hundred.',
'Forty out of fifty needs conversion.|These are invented practice counts: forty correct answers across fifty questions.|Divide forty by fifty, then multiply by one hundred to express the share as a percentage. The result is eighty percent. Keep the actual total in the denominator first.|This measures the share correct in this example, not selection probability or a rank prediction. Label exactly what the percentage represents.|Save this score-percentage calculation.',
'Place40correct tokens over50total card.|Show “example counts” label.|Write40/50×100=80%.|Replace vague score title with “share correct”.|End on numerator/denominator labels.',
'USE THE ACTUAL TOTAL|Example: 40 out of 50|40 ÷ 50 × 100 = 80%|Share correct only|Save the calculation',
'Invented counts clearly labelled; not a real result or official scoring system.','Name what the percentage measures.','percentage, practice review, arithmetic');
add(3,'MOFU','The arrow only goes one way','Reasoning explanation','All cats are mammals. Reverse carefully.',
'This arrow only goes one way.|The statement says all cats are mammals; it does not say all mammals are cats.|Draw the cat group inside the mammal group. A cat belongs to the larger group, while an unspecified mammal could belong outside the cat group. That is why the reversed statement does not follow.|Use the given relationship before choosing a conclusion. Keep the groups visible when you check it.|Save this one-way inference diagram.',
'Draw arrow CAT→MAMMAL; stop reverse arrow.|Show given statement.|Draw nested circles with outside-cat mammal region.|Mark reverse conclusion as not implied.|Return to one-way arrow.',
'ONE-WAY STATEMENT|All cats are mammals|Cats inside mammals|Reverse does not follow|Save the diagram',
'Original elementary inference using the explicit statement; no claim about a specific exam format.','A statement and its reverse can mean different things.','reasoning, inference, original practice');
add(3,'MOFU','One verb agrees with he','English practice','The subject tells this verb what to do.',
'Which verb fits with he?|Choose between “He go daily” and “He goes daily” for this simple present sentence.|In standard English, the third-person singular subject he takes goes here. Compare it with “They go daily,” where the plural subject uses go. Keep the subject beside the verb while you check.|The correct sentence is “He goes daily.” Write a similar example using she before checking it.|Save this subject-and-verb example.',
'Move HE card betweenGO andGOES.|Display two candidate sentences.|PairHE→GOES andTHEY→GO.|Reveal“He goes daily”; blankSHEsentence beside it.|ReturnHEcard to choice position.',
'HE GO OR GOES?|Choose the sentence|He goes • They go|He goes daily|Save the example',
'Original standard-English grammar practice; avoid claiming all verbs follow this exact form.','Keep the subject next to the verb you are checking.','English grammar, subject verb agreement, practice');
add(3,'MOFU','Publish a correction people can find','Brand trust','A corrected answer needs a visible note.',
'Keep the correction visible.|This labelled demonstration shows an answer option changing from twenty to thirty.|Check the working first: fifteen percent of two hundred equals thirty. Update the answer label, add a clear correction note, and revise any matching caption or linked copy that repeats the error.|Keep the corrected version easy to find. A learner revisiting the post should understand exactly which answer to use.|Save this correction workflow.',
'Pin correction note beside sample question.|Show sample before/after answer label.|Verify15/100×200=30 and fix option.|Update demonstration caption to same answer.|Show finished card and correction note together.',
'VISIBLE CORRECTION|Demonstration only|Correct answer: 30|Update repeated answer text|Save the workflow',
'Staged correction demonstration only; never imply an actual past error without evidence.','The caption and card should carry the same corrected answer.','teaching accuracy, corrections, AxomRank');
add(3,'MOFU','A mixed set with three different checks','Revision practice','Each question needs its own check.',
'Three questions. Three different checks.|Pause to attempt a quarter of eighty, x plus seven equals twelve, and forty out of fifty as a percentage.|The answers are twenty, five, and eighty percent. Check equal parts for the fraction, substitute five into the equation, and use fifty as the percentage denominator.|Write which check you forgot, then select a similar question using that method. Keep your review tied to the actual mistake.|Choose your next practice topic.',
'Lay fraction/equation/percentage cards face down.|Flip questions; display pause-to-attempt prompt.|Reveal answers with three compact checks.|Creator marks one missed check and topic.|Move selected topic card to next page.',
'THREE DIFFERENT CHECKS|Pause to attempt|20 • 5 • 80%|Parts • substitution • base|Choose the next topic',
'Original mixed revision; invite pause because three full attempts exceed the narration window.','Different answers need different ways of checking.','mixed revision, maths, original practice');

add(3,'BOFU','Return to a specific next set','Repeat practice','This is the next set after your review.',
'Your next set follows this review.|Choose the topic from a real question you just attempted on AxomRank.|Follow the current topic route shown on screen and open the available next set. Keep the corrected method beside your own working when you attempt its first question.|After checking the explanation, decide the next task from that attempt. A returning session begins with a specific question you can find.|Open the shown set for your next session.',
'Point from genuine creator review to live next-set route.|Show corrected notebook method.|Record actual topic navigation and available set.|Attempt question and reveal genuine explanation.|End on verified next-set destination.',
'AFTER THE REVIEW|Pick the missed topic|Open the available set|Use your corrected method|Start the next session',
'Verify route and set; do not imply automatic recommendations, saved progress or reminders unless present.','Your review can point to the next available task.','returning practice, topic sets, AxomRank');
add(3,'BOFU','Inspect a real PYQ record','PYQ Bank','Check the source before attempting this PYQ.',
'Keep the paper details with this question.|We are opening a genuine sourced record in the current PYQ Bank.|Look at the examination name, year, paper, and answer source available for the question shown. Attempt it independently before checking the explanation or linked answer key.|Use those details to understand what you are practising. The record on screen should be traceable to its original paper.|Open the shown PYQ collection.',
'Zoom into source line on actual PYQ record.|Show live bank entry and collection.|Record exam/year/paper/key details beside question.|Creator attempt beside accessible explanation or source key.|Return to verified collection entry.',
'SOURCE BESIDE QUESTION|Actual PYQ record|Exam • year • paper • key|Attempt before checking|Open the collection',
'Conditional: verify live PYQ Bank and original paper/key provenance. Do not promote unsourced questions as PYQs.','A past-paper record should carry its paper details.','PYQ Bank, AxomRank, exam questions');
add(3,'BOFU','Show the available language route','Assamese product access','Here is the actual Assamese practice route.',
'Choose the language you can follow.|This demonstration uses the current Assamese practice option available on AxomRank.|Follow the actual route shown on screen and read the question, options, and explanation. Check that the method remains complete in the language version you select.|Attempt the displayed question with your own working. Then use the explanation to choose what you want to practise next.|Open the shown Assamese practice option.',
'Reveal actual Assamese question screen in close-up.|Record real language route; no invented toggle.|Show full question/options and actual explanation.|Creator writes attempt beside phone.|End on verified Assamese set link.',
'CHOOSE YOUR LANGUAGE|Real Assamese route|Question and explanation|Attempt with your working|Open Assamese practice',
'Conditional: verify live Assamese route, supported set and complete explanation; fluent review required.','See the actual language experience before starting.','Assamese practice, AxomRank, bilingual');
add(3,'BOFU','Read the checkout details before choosing','Paid access','Pause at this screen before paying.',
'Read this screen before paying.|A current plan should show what you are buying and how access works.|Check the displayed total price, included practice, access duration, and any renewal or cancellation terms before proceeding. Compare them with the plan page you just read and resolve anything unclear through support.|Make your choice from the actual terms on screen. Keep the product details visible in the demonstration.|Review current access options through the profile link.',
'Finger pauses above real payment/proceed button.|Show actual plan details with sensitive fields hidden.|Highlight actual price/inclusions/duration/terms.|Open real support route if clarification needed.|Return to live access-options page without completing payment.',
'READ BEFORE PAYING|Current plan details|Total price and access terms|Resolve unclear details|Review access options',
'Only film live plan/checkout pages. Do not complete a purchase for the demo or invent refund policy.','Read the access terms at the point you choose.','AxomRank plans, paid access, product clarity');
add(3,'BOFU','The route when a learner gets stuck','Support and access','Use this route for a specific access problem.',
'Here is the route when access fails.|If the shown practice page does not open as expected, note the exact step.|Use the verified AxomRank support route on this screen. Explain which set you tried to open and what the page displayed, keeping passwords and payment details out of the message.|A specific report helps identify the issue without guessing. Use the current instructions in the reply before attempting the task again.|Open the shown support route.',
'Show labelled demonstration of a generic failed step.|Write set name and step in draft support message.|Navigate actual support route; redact personal data.|Show useful problem-report template, no invented reply.|End on verified support destination.',
'STUCK AT A STEP?|Name the set and step|Use verified support|Keep private details out|Open support route',
'Verify actual support channel; generic issue labelled example, no invented outage or response time.','A useful access report names the failed step.','AxomRank support, practice access, enquiry');
add(3,'BOFU','Choose tonight’s available practice','Practice conversion','Choose the task you can complete tonight.',
'Choose tonight’s practice from this screen.|Your next session can start with an available mock or a focused topic set.|Open AxomRank through the profile link, read the access and task instructions, and select the option that fits the time you have. Attempt first and keep a question for review afterwards.|Use that review to decide your next topic. The demonstration gives you a current route from watching to practising.|Open the profile link and choose your task.',
'Show real mock/topic-set entry choices on phone.|Place real available-time note beside screen.|Record actual selection and instructions without invented features.|Attempt question and mark review task in notebook.|Freeze on working profile practice link.',
'CHOOSE TONIGHT’S TASK|Available mock or topic set|Read access and instructions|Attempt, then review|Start through profile link',
'Verify current choices and destination; show only existing products and accurate access requirements.','The next step is a task you can actually start.','AxomRank, start practice, Assam exams');

add(2,'TOFU','The rain interrupted the plan','Aspirant life','Your study plan can fit this rainy evening.',
'The rain changed tonight’s plan.|You are indoors with the topic you meant to practise earlier.|Choose one question from that topic and write an answer before checking. Use the quiet moment you actually have, rather than waiting for the perfect evening.|Mark the step you want to revise and set a small task for the next session. Keep the plan flexible.|Share this with your rainy-evening study friend.',
'Rain on window; focus pulls to open notebook.|Show a crossed-out outdoor plan beside topic card.|Overhead shot of one original question attempt.|Bookmark one step; write tomorrow’s small task.|Return focus to rain and ready notebook.',
'PLANS CHANGED|Use tonight’s window|Attempt one question|Set the next task|Share with a friend',
'Film ordinary weather footage; do not exploit flood damage or hardship.','Your plan can change without losing its next task.','Assam students, evening practice, study routine');
add(2,'TOFU','Your town on a blank card','Community and place','Which place deserves our next GK question?',
'Your town belongs on this card.|We have a blank location card waiting for the next Assam story.|Suggest a place and one question you would like answered about it. We will check the detail before turning it into a practice question with a source.|A familiar place can lead to a useful lesson when we keep its name and context accurate.|Comment a place and your question.',
'Reveal an empty map-pin card beside AxomRank mark.|Show handwritten “next place” slot.|Creator writes an example suggestion without inventing facts.|Add source and question fields to the card.|Hold the blank place-name slot towards camera.',
'YOUR TOWN NEXT?|One place|One question to check|Source before lesson|Comment your suggestion',
'Invitation only; avoid claiming suggestions have already arrived. Check actual places before follow-up.','Give the next location card a place you know.','Assam GK, local stories, community');
add(2,'TOFU','The average hides a new student','Everyday maths','One person joins. Check the average again.',
'Someone joined. The average changed.|Two practice scores are ten and twenty, making their average fifteen.|Add a third score of thirty. The total becomes sixty, and there are now three scores. Sixty divided by three gives twenty.|The new average uses every value, not just the old average and the new score. Keep the original count visible.|Comment your answer before the reveal.',
'Slide a third paper person into a two-person score chart.|Show 10 and 20 with average 15.|Add 30; count three cards and total 60.|Cross out (15+30)/2; show 60/3.|Third figure slides out for the loop.',
'SOMEONE JOINED|10 and 20 → 15|Add 30: total 60|60 ÷ 3 = 20|What did you choose?',
'Invented practice scores labelled example; no student-result claim.','A new member changes the total and the count.','average, quick maths, original practice');
add(2,'TOFU','The study-corner invitation','Community','Show one habit from your study corner.',
'Show one habit from this corner.|Here is my notebook, and the slip that tells me where to restart.|I write the next task before putting the book away. You can share your own corner with one habit that helps you begin a session.|Keep faces, addresses, and personal papers out of the photo. We will ask before featuring anything identifiable from a submission.|Comment the habit you would share.',
'Creator points to a real restart slip on desk.|Close-up of the slip and notebook.|Show an empty submission frame with habit caption.|Turn over personal documents; frame only the desk.|End on one-line habit question.',
'ONE CORNER, ONE HABIT|My restart slip|What helps you begin?|Keep personal details out|Comment your habit',
'Creator example only; obtain publication permission for later submissions.','Show us the habit, not your personal documents.','study corner, Assam aspirants, community');
add(2,'TOFU','Paper boat, river question','Assam GK','Name the river around this island.',
'Which river holds Majuli?|Use this paper island as a cue before looking at the answer.|Majuli is a river island in the Brahmaputra. Write the island and the river as a pair, then cover the river name and try recalling it.|Keep the geographical connection clear instead of adding an unchecked size record. The place itself gives us enough for one useful question.|Share this with your geography partner.',
'Float paper island labelled Majuli in blue tray.|Display hidden river-name card.|Reveal Brahmaputra and connect the names.|Cover river label; retain island outline.|Paper boat passes the original island frame.',
'NAME THE RIVER|Majuli|Brahmaputra|Cover and recall|Share the geography question',
'Source S4. Diagram is illustrative, not a precise map; avoid largest-island claims.','The island name has a river connection.','Majuli, Brahmaputra, Assam geography');
add(2,'TOFU','The blank answer option','Quick challenge','One option is missing. Fill it.',
'One answer option is missing.|This original question asks for a quarter of eighty.|Before I fill the blank, divide eighty into four equal shares. Each share contains twenty, so twenty belongs in the missing option.|Now check the wording: a quarter means one of four equal parts. Keep that meaning beside the answer when you revise.|Comment the number you wrote first.',
'Rub out one multiple-choice option with an eraser.|Show 1/4 of 80=? and a blank choice.|Divide eighty-token graphic into four groups.|Write 20 in erased slot and label one group.|Erase the answer again to restart.',
'FILL THE OPTION|¼ of 80|80 ÷ 4|Answer = 20|Your first number?',
'Original practice; preserve visible quarter symbol and equal-share logic.','The missing option gives you room to attempt.','fractions, original quiz, maths');
add(2,'TOFU','The family room gets noisy','Aspirant life','This session needs a smaller task.',
'The room got noisy again.|You are sharing the space, and the original study plan no longer fits.|Put one short question on a page you can return to. Attempt what you can now, and mark the exact line to resume when the room settles.|You can choose a different window for the longer task. The bookmark keeps this interrupted attempt from becoming a fresh search.|Share this with a shared-room student.',
'Notebook shot interrupted by ordinary off-camera conversation.|Creator moves long plan aside.|Attempt one short question; place bookmark at exact line.|Write a later study window on a slip.|Close on bookmark protruding from notebook.',
'INTERRUPTED AGAIN|Shared room|Mark the restart line|Move the longer task|Share with a student',
'Staged ordinary scene with consent; no family blame or hardship spectacle.','A bookmark can hold the place your session lost.','student life, shared room, study routine');
add(2,'TOFU','Two students, different free hours','Aspirant life','Your timetable does not need their hours.',
'Your free hour is different.|One friend studies before college; another opens the notebook after work.|Give each plan a small task that fits its real window. Both can attempt the same question and compare their reasoning when they meet later.|The useful comparison is the work they can explain. Keep the session size realistic for the time you actually have.|Send this to your differently-timed study partner.',
'Split-screen two clocks beside identical notebooks.|Show before-college and after-work labels.|Both perform separate attempts of same question.|Match-cut their workings side by side later.|Clocks return beside the same question.',
'DIFFERENT FREE HOURS|Before college • after work|Same question, own window|Compare the working|Send to your partner',
'Consenting adult performers; no claim of actual schedules or score improvements.','Two schedules can still share a practice question.','Assam aspirants, study partner, timetable');
add(2,'TOFU','Four directions, one turn','Quick reasoning','Face north. Turn right. Point where?',
'North. One right turn. Where now?|Use this compass card and point before the arrow moves.|Facing north, a right turn points east. Now turn right again from east, and you face south. Each turn uses the direction you currently face.|Track the arrow after every instruction rather than keeping the original direction in mind throughout.|Comment the direction after the first turn.',
'Creator faces paper N arrow; hand poised to turn.|Show N/E/S/W labels and first-turn question.|Rotate arrow north→east→south with pauses.|Circle the current direction after each turn.|Reset north and hold first turn hidden.',
'POINT THE DIRECTION|Face north|Right → east → south|Track each turn|First turn answer?',
'Original reasoning; right means clockwise quarter-turn in the diagram.','The second turn starts from your new direction.','direction reasoning, quick quiz, original practice');
add(2,'TOFU','An Assamese explanation aloud','Language and access','An Assamese lesson needs the whole method.',
'The explanation matters in Assamese too.|Put a fully reviewed Assamese question and explanation beside the English version.|Use the ratio example: fifty split into two to three. Five equal parts make ten each, giving twenty and thirty. Keep that complete reasoning in both versions.|Read the translated instructions aloud and check the rendered letters before posting. Every option should still match.|Comment the topic you want explained next.',
'Highlight explanation area on Assamese card, not just heading.|Reveal paired English card.|Draw five equal boxes under both versions.|Fluent reader checks printed script and phone render.|Point to next-topic prompt on both cards.',
'EXPLAIN THE WHOLE METHOD|Both versions complete|5 parts → 20 and 30|Read and proofread|Which topic next?',
'English voiceover draft; translate for an Assamese-led take only after fluent review.','Translate the explanation along with the question.','Assamese, bilingual education, ratio');
add(2,'TOFU','Ten rupees in the wrong pile','Everyday maths','Profit percentage uses this pile of money.',
'Which pile is the percentage base?|This original example buys an item for fifty and sells it for sixty.|The profit is ten rupees. To find profit percentage, compare that ten with the fifty-rupee cost, giving ten divided by fifty times one hundred, or twenty percent.|Using sixty would answer a different calculation. Label cost price before choosing the denominator.|Share this with your maths practice partner.',
'Move ₹10 paper token between COST and SELLING piles.|Show fictional ₹50 cost and ₹60 sale.|Write profit10; divide by50 and reveal20%.|Circle COST as base; move selling pile aside.|Return token between the two labelled piles.',
'WHICH BASE?|Cost ₹50 • sale ₹60|Profit ₹10 ÷ cost ₹50|Profit = 20%|Share the base check',
'Original arithmetic, not financial advice or an actual sale.','The denominator decides which percentage you calculated.','profit percentage, arithmetic, original quiz');
add(2,'TOFU','A mistake without a public score','Aspirant life','You can review the question privately.',
'You can keep the score private.|Turn the result screen away and bring one confusing question onto the desk.|Write the answer you chose and the step that led there. Compare it with the correct explanation, then note what you would change next time.|A useful review can stay in your own notebook. Sharing a result is optional; understanding the question is today’s task.|Send this to a friend reviewing mistakes.',
'Flip a blank mock-result prop face down.|Pull one original question forward.|Show wrong working beside correct working.|Circle one corrected step with score still hidden.|Close notebook; leave private review label visible.',
'REVIEW CAN BE PRIVATE|One confusing question|Compare the methods|Keep the useful correction|Send to a friend',
'No fabricated low score; use blank result prop labelled demonstration.','You can learn from a result without posting it.','mock review, student confidence, study habits');
add(2,'TOFU','Clap the multiplication check','Quick challenge','Four packets, six each. Count first.',
'Four packets. Six in each.|Before the answer appears, point to the operation this question needs.|Four equal groups of six means four multiplied by six, giving twenty-four items altogether. Adding four and six would ignore what each packet contains.|Now keep the packet count and the amount per packet labelled. Those labels make the operation easier to justify.|Comment the operation you chose.',
'Drop four small paper packets onto table on four beats.|Display “6 items per packet” and +/× options.|Open packets as graphic groups; reveal4×6=24.|Bracket groups and contents separately.|Repack and repeat the opening drop.',
'CHOOSE THE OPERATION|4 packets • 6 each|4 × 6 = 24|Groups × amount per group|Which operation?',
'Original practice; use paper tokens to keep count visible.','The packet labels tell you which operation to use.','multiplication, original quiz, basic maths');
add(2,'TOFU','A GK card in a different landscape','Assam GK','Which sanctuary sits by Himalayan foothills?',
'Foothills behind it. Name the sanctuary.|Choose Manas or Kaziranga using this landscape clue rather than a single animal.|UNESCO describes Manas Wildlife Sanctuary at the Himalayan foothills, with grasslands and forests. Keep the sanctuary name connected to the landscape cue on your revision card.|A clue about location can ask something different from a clue about wildlife. Read what the question actually names.|Share this with your Assam GK friend.',
'Raise a labelled foothill illustration behind hidden answer.|Display Manas/Kaziranga choices.|Reveal Manas and short sourced landscape cue.|Swap animal icon for landscape icon to show wording.|Cover sanctuary name for loop.',
'NAME THE SANCTUARY|Himalayan foothills|Manas Wildlife Sanctuary|Read the landscape clue|Share the GK clue',
'Source S3; use an illustration or licensed correctly identified Manas footage.','This GK clue comes from the landscape.','Manas, Assam GK, geography');
add(2,'TOFU','Pick the next clinic','Community','Which mistake should we explain next?',
'Choose our next wrong-answer clinic.|These two original questions have different traps hidden in the working.|One changes the percentage base; the other forgets to count all the ratio parts. Point to the step you want explained and tell us why it confused you.|We can turn a specific difficulty into a clear lesson. You do not need to post your score to ask.|Comment “base” or “ratio” with your question.',
'Hold two envelopes labelled BASE and RATIO.|Reveal one wrong working from each.|Point to changed denominator and missing part.|Show empty next-lesson page with selected label.|Hold both envelopes back up.',
'CHOOSE THE CLINIC|BASE or RATIO|Which step confused you?|A question is enough|Comment your choice',
'Use original examples; no invented viewer comments or engagement totals.','A specific confusion can become the next lesson.','Wrong Answer Clinic, maths, community');

add(2,'MOFU','Profit percentage denominator','Wrong Answer Clinic','That denominator is the cost price.',
'Divide profit by cost price.|An item bought for fifty and sold for sixty earns ten rupees profit.|For profit percentage, divide ten by the fifty-rupee cost and multiply by one hundred. The result is twenty percent, with the cost labelled as the base.|Dividing by the selling price measures profit as a share of sales instead. Keep the question’s requested quantity visible.|Save this denominator example.',
'Circle denominator60 in wrong profit-percent working.|Show cost50/sale60/profit10 cards.|Replace denominator with50; calculate20%.|Label alternate fraction as share of sales.|Highlight requested “profit percentage”.',
'LABEL COST PRICE|Profit = 60 − 50|10 ÷ 50 × 100|Profit percentage = 20%|Save the denominator check',
'Original arithmetic; terminology must match cost-based profit percentage.','Two denominators can describe different quantities.','profit percentage, explanation, arithmetic');
add(2,'MOFU','Fractions become equal boxes','Maths explanation','A quarter means one of these boxes.',
'One quarter means one equal part.|Draw four equal boxes under the total of eighty.|Share eighty equally across them: each box gets twenty. One quarter takes one box; three quarters take three boxes, so their value is sixty.|Check that the quarter and the remaining three quarters add back to eighty. The picture keeps the whole visible.|Save this fraction-to-box method.',
'Draw four boxes; shade only one.|Put total80 above boxes.|Write20 in each; bracket three as60.|Show20+60=80 below strip.|Erase values but retain shaded quarter.',
'ONE EQUAL PART|Whole = 80|¼ = 20 • ¾ = 60|20 + 60 = 80|Save the box method',
'Original practice; boxes must have equal size.','Keep the whole visible while finding the part.','fractions, maths explanation, original practice');
add(2,'MOFU','Adding a new score correctly','Maths explanation','Keep the old total, not just the average.',
'The old average needs its count.|Two scores average fifteen, so their combined total is thirty.|When a new score of thirty joins, the new total is sixty and the new count is three. Divide sixty by three to get twenty.|Averaging fifteen and thirty directly would give equal weight to two unequal-sized groups. Recover the original total before updating.|Save this new-member average method.',
'Put average15 beside “2 scores” label.|Multiply15×2=30.|Add new30; divide60 by3.|Cross out(15+30)/2; show group sizes2and1.|Circle total and count fields.',
'KEEP THE COUNT|15 × 2 = 30|New total 60 ÷ 3|New average = 20|Save the update method',
'Original worked example; imaginary scores labelled example.','An old average carries a group size with it.','average, quantitative aptitude, explanation');
add(2,'MOFU','The unit conversion margin','Maths explanation','Convert both lengths before you subtract.',
'These lengths use different units.|This original question subtracts fifty centimetres from one metre.|Convert one metre into one hundred centimetres first. Subtract fifty centimetres, leaving fifty centimetres, which is half a metre. Keep the units beside each number.|Subtracting fifty directly from one would mix two scales. Put both measurements in the same unit before doing the arithmetic.|Save this unit-check reminder.',
'Place1m ruler strip beside50cm strip.|Show subtraction with unlike units.|Relabel1m as100cm; remove50cm.|Reveal50cm=0.5m; highlight unit labels.|Reset two differently labelled strips.',
'CHECK THE UNITS|1 m − 50 cm|100 cm − 50 cm|50 cm = 0.5 m|Save the unit check',
'Original practice; diagram not required to be actual scale, label illustrative if shortened.','The unit belongs beside the number.','unit conversion, arithmetic, maths');
add(2,'MOFU','Area is not the boundary','Maths explanation','This rectangle has two different answers.',
'Inside or around this rectangle?|Its sides are four centimetres and three centimetres in this original example.|Area measures the inside: four times three gives twelve square centimetres. Perimeter measures the boundary: twice four plus twice three gives fourteen centimetres.|Read which quantity the question asks for. The units help you check whether your answer describes coverage or length.|Save this area-and-perimeter comparison.',
'Trace rectangle outline then tap shaded interior.|Show sides4cm and3cm.|Fill12 square tiles; trace14cm boundary.|Highlight cm² versus cm labels.|Split screen interior12/boundary14.',
'INSIDE OR AROUND?|4 cm × 3 cm|Area 12 cm²|Perimeter 14 cm|Save the comparison',
'Original example; distinguish 2×(4+3)=14 from area4×3=12.','Your units can reveal which quantity you found.','area, perimeter, quantitative aptitude');
add(2,'MOFU','Source cards for two parks','Assam GK method','Two parks need two separate source cards.',
'Keep these park cards separate.|Kaziranga and Manas both appear in Assam GK, but one clue should not replace another.|Kaziranga’s UNESCO listing records its World Heritage inscription in nineteen eighty-five. The Manas listing describes its Himalayan foothill setting. Attach each fact to its own site name and source.|Test one clue at a time, with the name hidden. That keeps your revision question precise.|Save this two-card revision format.',
'Separate two cards that were stacked together.|Place park names side by side.|Add1985 under Kaziranga and foothills under Manas.|Hide each name separately for recall.|Show source IDs under both cards.',
'KEEP CARDS SEPARATE|Kaziranga • Manas|1985 • Himalayan foothills|One clue per card|Save the revision format',
'Sources S3 and S5. The year here belongs to Kaziranga’s inscription, not establishment.','Attach the fact to the correct site name.','Kaziranga, Manas, Assam GK');
add(2,'MOFU','A repeat attempt with the answer covered','Study method','Can you explain it without the answer?',
'Cover the answer and attempt again.|Use a question you already reviewed, with the explanation hidden.|Write the method from memory, then uncover the explanation and compare each step. If one step disappears, mark it and write a short reason beside the corrected line.|This gives you a practical check of what you can reproduce today. Use a similar new question after this repeat.|Try one covered-answer attempt now.',
'Cover corrected working with an opaque sheet.|Show familiar original question only.|Creator reconstructs method on fresh page.|Lift cover; compare line by line.|Place similar question below both workings.',
'COVER THE ANSWER|Attempt from memory|Compare each step|Mark the missing line|Try one repeat now',
'Suggested practice process; no unverified memory-improvement statistic.','A covered answer changes what you can check.','revision, repeat practice, mistake review');
add(2,'MOFU','Your explanation becomes the lesson','Community teaching','Bring the confusing step, not a score.',
'Bring us the confusing step.|Here is a creator-written example: why do we divide fifty by five?|The ratio is two to three, so the total represents five equal parts. Fifty divided by five gives the value of one part, before we assign two or three parts.|A precise question lets the explanation focus on the missing link. Your own working can help show that link.|Comment the step you want explained.',
'Reveal a sample question card labelled creator example.|Zoom into denominator5 under50.|Draw five equal boxes; assign two and three.|Write a one-line explanation request template.|Point to blank “my confusing step” box.',
'BRING THE STEP|Why divide by 5?|2 + 3 equal parts|Ask a specific question|Comment your step',
'Use creator example until a real viewer request arrives; obtain consent before displaying usernames.','A clear question tells us where the lesson should begin.','viewer questions, ratio, explanations');
add(2,'MOFU','The option elimination check','Reasoning explanation','Cross out an option with a reason.',
'Cross it out for a reason.|Which number is divisible by five: twelve, twenty-three, thirty-five, or forty-two?|In base-ten whole numbers, a final digit of zero or five indicates divisibility by five. Only thirty-five has that final digit here, so eliminate the others.|Write the rule beside the crossing-out. You can then check that your elimination follows the question instead of a guess.|Save this option-check example.',
'Strike option12; pause over an empty reason line.|Show all four options.|Circle last digits; select35.|Write “last digit0or5” beside crossed options.|Restore options with rule visible.',
'WRITE THE REASON|12 • 23 • 35 • 42|Ends in 0 or 5|Answer = 35|Save the rule check',
'Original practice; rule for base-ten integers.','An eliminated option should have a visible reason.','divisibility, reasoning, original quiz');

add(2,'BOFU','A mock followed by review','Mock workflow','This session includes the review step.',
'Leave time after the last answer.|We are showing a real available mock and its actual review route.|Read its instructions, complete the attempt, then open the review at the point allowed by the interface. Select one question whose reasoning you want to understand.|Compare the explanation with your working and choose a follow-up topic. The route on screen shows how to reach that step.|Start this mock through the profile link.',
'Finger moves beyond actual last-question screen towards review.|Show real instructions and mock entry.|Record genuine completed creator attempt and review route.|Open one real explanation beside creator working.|Return to live mock start destination.',
'AFTER THE LAST ANSWER|Read actual instructions|Attempt → review|Pick a follow-up topic|Start the shown mock',
'Requires live mock and review availability; creator attempt may be shown with identifying details redacted.','See where the review lives before you begin.','mock review, AxomRank, mock start');
add(2,'BOFU','Compare plans by your next task','Paid access','Compare the plan with your actual task.',
'Put your task beside the plan.|You want a specific mock or topic set, so start with that requirement.|Read the current plan page for included practice, access duration, total price, and any renewal terms shown. Compare those details with the sessions you intend to complete.|Use the available option that fits your need after reading its conditions. The page on screen contains the current offer.|View current plans through the shown link.',
'Place handwritten practice need beside real plan page.|Highlight requested mock or set name.|Scroll actual inclusions, duration, price and renewal terms.|Point to matching available option without inventing discount.|End on live plan-page link.',
'TASK BESIDE PLAN|What do you need?|Inclusions • duration • price|Read current terms|View available plans',
'Film only a live plan page; confirm current offer and terms. No invented prices, discounts or scarcity.','A plan comparison begins with what you intend to practise.','AxomRank plans, exam practice, access');
add(2,'BOFU','One question before a longer commitment','Product sample','Try the real question shown here first.',
'Try this real sample first.|You can inspect the question and its explanation before choosing more practice.|Follow the sample route shown on the phone. Make your own attempt, then check whether the explanation makes the method clearer. Read any access step before you continue.|Use that experience when deciding whether the available practice option suits you. Keep your working for the next question.|Open the shown sample through our profile.',
'Real sample question fills frame with answer hidden.|Show sample entry page.|Record actual attempt and accessible explanation route.|Creator compares working and visible method.|Return to verified sample link.',
'TRY THIS SAMPLE|Read before checking|Attempt → explanation|Evaluate the actual experience|Open the shown sample',
'Verify sample access and explanation; do not describe it as free unless actually free.','Evaluate a real attempt before choosing a longer session.','sample practice, AxomRank, product demo');
add(2,'BOFU','Use a planner with a real window','Study Planner','Give the planner the time you actually have.',
'Give the planner a real study window.|Tonight’s window is twenty minutes, and your chosen topic is percentages.|Use the current Study Planner shown here, entering only the fields it actually supports. Check its output and reduce the task yourself if it exceeds the time you have.|Put the selected task in your notebook and begin with its first question. Planning should lead to an attempt.|Open the Study Planner through the shown link.',
'Move20-minute card onto real planner screen.|Show notebook topic and time window.|Record supported inputs and genuine output.|Select realistic task; start related question.|Freeze actual planner entry point.',
'YOUR REAL WINDOW|20 minutes • percentages|Use supported fields|Choose an achievable task|Open Study Planner',
'Conditional: verify Study Planner is live and record supported inputs. If unavailable, use a manual-plan tutorial with MOFU CTA and rebalance BOFU elsewhere.','The available window belongs in your plan.','Study Planner, AxomRank, study plan');
add(2,'BOFU','Eligibility tool with the source beside it','Eligibility Checker','Keep the official notice beside this tool.',
'Keep the notice beside the checker.|The exam notice is the source for the rules you need to read.|If the current Eligibility Checker supports that examination, enter the requested details and inspect its result. Compare the stated criteria with the linked official notice and your own documents.|Use the tool as a starting point for checking information. Resolve any mismatch before making an application decision.|Open the checker and its source notice.',
'Place official-notice window beside actual checker.|Show supported exam selection, date and source.|Record a clearly labelled fictional input example.|Compare output criteria with official notice excerpt.|End on verified checker and source link.',
'NOTICE BESIDE TOOL|Select a supported exam|Check result against notice|Resolve any mismatch|Open checker and source',
'Conditional: verify live checker, supported cycle and official criteria. Fictional example must be labelled; do not imply confirmed eligibility.','The source notice stays beside the result.','Eligibility Checker, AxomRank, exam guidance');
add(2,'BOFU','What Document Vault actually offers','Document Vault','Check the service details before an enquiry.',
'Read the service before you enquire.|This screen shows the current Document Vault description and contact route.|Look at the tasks the service actually offers, the documents it requests, and the listed process or charges. Keep personal documents out of the public demonstration.|If the available service fits what you need, use the verified enquiry route and ask about your specific task before sending files.|Enquire through the shown Document Vault route.',
'Open actual Document Vault service-details screen.|Point to real service description.|Highlight actual scope and enquiry route; use blank props.|Type task-based enquiry without attaching documents.|End on verified enquiry destination.',
'READ THE SERVICE|Current scope|Process and listed charges|Ask about your task|Use the enquiry route',
'Conditional: verify live service, scope and contact route. No storage-security or guaranteed-processing claim.','Know the service scope before sending an enquiry.','Document Vault, AxomRank, service enquiry');

add(1,'TOFU','The book opens after work','Aspirant life','Your study day can start after dinner.',
'The chores ended. Your session starts now.|You have twenty minutes tonight, so put one topic on the desk.|Attempt three questions before opening any explanation. Mark the one that made you hesitate, even if you guessed correctly.|Review that question, then leave tomorrow’s first question on the page. That gives the next session a starting point.|Share this with your evening study partner.',
'Put a dish down; match-cut to opening a notebook.|Show clock and a handwritten 20-minute plan.|Overhead shot of three original practice questions.|Circle one hesitation; set out tomorrow’s question.|Close notebook beside the ready pencil.',
'AFTER THE DAY|20 minutes tonight|Attempt 3 questions|Leave a starting point|Share with your partner',
'Film an adult creator in their own room; do not present the scene as a student testimonial.','Your first study hour might be everyone else’s last.','ADRE, evening study, Assam aspirants');
add(1,'TOFU','A saved post meets a blank notebook','Study habits','How many saved lessons became attempted questions?',
'Saved again. Attempted yet?|Your phone has the lesson, but this notebook still has no working.|Open one saved question and put the phone face down. Write your answer and one reason before checking the explanation.|Now the saved post has become something you attempted. Keep the method you missed beside your own working.|Send this to your lesson-saving friend.',
'Swipe a staged saved-post folder; cut to blank paper.|Hold phone above empty notebook.|Reveal one original question; turn phone down.|Show attempted answer beside corrected method.|Return to folder, with one item marked attempted.',
'SAVED AGAIN|Where is your working?|Answer before checking|One post attempted|Send to a friend',
'Use a creator-made saved folder; avoid showing another creator’s content without permission.','The save button cannot write your working.','exam practice, study habits, revision');
add(1,'TOFU','₹100 becomes ₹96','Everyday maths','Up twenty, down twenty. Back to where?',
'Up twenty. Down twenty. Still one hundred?|Start with a price of one hundred rupees on this card.|A twenty percent increase makes it one hundred twenty. The next twenty percent is taken from that new amount, so subtract twenty-four.|The final price is ninety-six. The same percentage used two different bases, which changes the result.|Comment your answer before the next replay.',
'Place ₹100 card between +20% and −20% cards.|Hold original price in close-up.|Slide ₹120 card in; remove ₹24 tokens.|Reveal ₹96 and circle the changed base.|Reset the original cards for a visual loop.',
'BACK TO 100?|Start ₹100|₹100 → ₹120 → ₹96|The base changed|What did you predict?',
'Original arithmetic example: 100×1.2×0.8=96; labels must remain on screen through the reveal.','The second percentage has a different starting point.','percentage, original practice, maths');
add(1,'TOFU','Your desk does not need a makeover','Aspirant life','This ordinary corner is enough to begin.',
'This desk is already ready.|There is room for a notebook, a pencil, and today’s question.|Move the extra books aside and put one practice task in the centre. Choose a session small enough to finish in this actual space.|Before packing up, write the next question number on a slip. Leave it where you will see it.|Tell us what stays on your study desk.',
'Push decorative desk items aside to reveal notebook.|Show modest, real study corner.|Place one original question centre frame.|Write next question number; tuck slip into book.|Wide shot of the same unembellished desk.',
'READY ENOUGH|One notebook|One clear task|Next question ready|What is on your desk?',
'Use the creator’s own space; no claims that desk design changes exam outcomes.','A useful study corner can look ordinary.','study desk, student life, Assam');
add(1,'TOFU','Three cups and one change mistake','Everyday maths','The bill is sixty. What comes back?',
'Three cups. Check your change.|This practice bill says twenty rupees per cup, paid with one hundred.|Three times twenty makes sixty. Subtract sixty from the hundred you handed over, and the change should be forty rupees.|Before reaching for a calculator, name the two steps: total cost first, then money returned. Keep their order clear.|Send this question to your tea companion.',
'Set down three cups and a mock ₹100 note.|Show fictional menu: ₹20 per cup.|Write 3×20=60; move forty paper tokens back.|Number the two calculation steps.|Two hands point to the answer over tea.',
'CHECK THE CHANGE|3 cups × ₹20|₹100 − ₹60|Change = ₹40|Send to your tea companion',
'Prices are invented practice values, not a claim about a local café.','Tea break, two calculations, one answer.','arithmetic, Assam tea, quick quiz');
add(1,'TOFU','The silhouette you recognise','Assam GK','You know this outline. Name its town.',
'Name the town behind this silhouette.|The outline belongs to Rang Ghar, the landmark in AxomRank’s identity.|Choose between Sivasagar and Jorhat before the reveal. Rang Ghar is in Sivasagar, and it served as an Ahom-era pavilion for watching recreation and sports.|Pair the image with the place and its purpose. That gives the familiar shape a useful revision connection.|Comment the place you want us to cover.',
'Reveal Rang Ghar silhouette from behind a card.|Show supplied logo beside labelled landmark photo.|Display Sivasagar/Jorhat choices; pause two seconds.|Reveal Sivasagar and pavilion-purpose card.|Pull out an empty card for the next place.',
'NAME THE TOWN|Rang Ghar|Sivasagar or Jorhat?|Sivasagar • sports pavilion|Which place next?',
'Source S1; use owned/licensed landmark imagery. Avoid disputed dates and oldest-in-Asia claims.','The logo contains a revision question.','Rang Ghar, Sivasagar, Assam GK');
add(1,'TOFU','The first page of preparation','Beginner guidance','Start with a question you can attempt.',
'The syllabus is open. You are stuck.|A long list of topics can make the first task unclear.|Choose one familiar topic and try three original practice questions. Keep your working, including the step where you stopped or guessed.|Use that attempt to choose what to revise next. Today’s goal is a useful first session you can actually complete.|Follow AxomRank for questions to begin with.',
'Open a long handwritten topic list; pencil hovers.|Point to too many highlighted headings.|Move one topic card forward; attempt three questions.|Mark one gap and write a next-session task.|Close on the first page containing real working.',
'WHERE DO I START?|Pick one topic|Try 3 questions|Choose the next task|Follow for practice',
'Use a generic topic list, not an unverified official syllabus.','Your first page needs a task you can finish.','beginner preparation, ADRE, practice');
add(1,'TOFU','One seat on the bus','Aspirant life','Your journey can carry one small question.',
'One bus ride. One question.|Keep the task short enough to read comfortably while you are seated.|Use this original sequence: two, four, eight, sixteen. What follows if each term doubles? Pause and choose before we reveal thirty-two.|Write down the rule when you reach your stop. The useful part is explaining how you got there.|Share this with your commuting study friend.',
'Seat-side close-up of phone displaying 2,4,8,16,?.|Show seated creator with small question card.|Animate ×2 arrows; hold answer hidden briefly.|Reveal 32; creator notes the rule after getting off.|Match-cut next bus-stop card to opening question.',
'ONE RIDE, ONE QUESTION|2, 4, 8, 16, ?|Each term ×2|Next = 32|Share with a commuter',
'Film only while safely seated; make the stipulated doubling rule explicit.','What can you attempt before your stop?','number series, student commute, reasoning');
add(1,'TOFU','The friend asks a better question','Community','Ask your friend what they attempted today.',
'Ask what they attempted today.|Two friends can study the same chapter and still miss different steps.|Give each person the same question and let them answer separately. Then compare the reason behind the answer, before showing the explanation.|If you disagree, find the exact step where your working separates. Write that step down for your next session.|Send this to your practice partner.',
'Two friends swap cards saying “What did you attempt?”|Show identical original question sheets.|Split-screen separate attempts, without peeking.|Place both workings side by side; circle divergence.|Friends return to the same question together.',
'ASK ABOUT THE ATTEMPT|Same question|Answer separately|Compare the reasoning|Send to your partner',
'Use consenting adult performers; do not fabricate actual student outcomes.','A study partner can ask a more useful question.','study partner, exam practice, community');
add(1,'TOFU','Half the price twice','Everyday maths','Two half-price labels do not mean free.',
'Half price twice. Is it free?|This original example starts with a price of two hundred rupees.|The first fifty percent discount removes one hundred, leaving one hundred. The second removes half of that remaining amount, which is fifty.|So you pay fifty rupees, a total reduction of one hundred fifty. Each discount works on the current price.|Share this before your next sale-scroll.',
'Stick two 50% OFF labels over a ₹200 card.|Reveal question “Free or ₹50?”|Fold price strip to ₹100, then ₹50.|Show total reduction ₹150 out of ₹200.|Peel labels off, returning to the first frame.',
'TWO HALF-PRICE LABELS|Start ₹200|₹200 → ₹100 → ₹50|Total discount = 75%|Share the price trap',
'Original practice: 200×0.5×0.5=50. No real store or offer implied.','Two discount stickers, two different bases.','discount maths, percentage, arithmetic');
add(1,'TOFU','Two language cards, one method','Language and access','The method survives a language change.',
'Same question. Choose your language.|Place the English question beside a fully reviewed Assamese version.|Both ask for fifteen percent of two hundred. Ten percent gives twenty, and five percent gives ten, so together they give thirty.|The explanation should remain complete in either language. Keep the numbers and the reasoning aligned when you switch.|Tell us your preferred explanation language.',
'Slide English and Assamese cards together.|Show identical options and quantities on each.|Draw 10%=20 and 5%=10 below both.|Highlight answer 30 on both cards.|Point to an English/Assamese poll card.',
'SAME METHOD|English • Assamese|10% + 5%|Answer = 30|Which language?',
'Have a fluent Assamese reader approve the full translated card and rendered glyphs.','A language choice should keep the full explanation.','Assamese learning, bilingual, percentage');
add(1,'TOFU','The rhinoceros question','Assam GK','One horn. Which Assam national park?',
'One horn. Name the park.|Choose Kaziranga or Manas for the park famously associated with this rhinoceros.|The answer is Kaziranga National Park. Use the animal and the park name as a memory pair, then cover the answer and test yourself.|This question asks for the familiar association, not every place the species occurs. Keep the wording precise.|Share this with your Assam GK partner.',
'Reveal licensed one-horned rhino image through a circle.|Show Kaziranga and Manas option cards.|Turn over Kaziranga card; pair it with rhino.|Cover park label, leaving image as recall cue.|Slide the labelled pair back together.',
'NAME THE PARK|Kaziranga or Manas?|Kaziranga National Park|Remember the wording|Share the GK question',
'Source S2; “famously associated” does not imply exclusive species distribution.','Recognise the animal, then read the question carefully.','Kaziranga, Assam GK, wildlife');
add(1,'TOFU','A page opened at midnight','Aspirant life','A late start still needs a small task.',
'The clock says late. Choose one task.|You do not need to cram the entire chapter into tonight.|Pick one question you already planned to attempt. Write the method, check the explanation, and mark anything you want to ask about tomorrow.|Leave the unfinished chapter for a realistic next session. A smaller task gives this late start a clear ending.|Send this to your late-starting study friend.',
'Clock close-up; cut to unopened notebook.|Move a huge topic stack away.|Place one question on desk and work it.|Bookmark the question needing clarification; close book.|Leave a tomorrow card on top.',
'LATE START|One planned question|Attempt and review|Leave tomorrow a task|Send to a friend',
'Use a staged clock; avoid glorifying sleep deprivation or implying late study is preferable.','A late start can have a sensible stopping point.','student life, study routine, exam preparation');
add(1,'TOFU','The answer under the sticky note','Quick challenge','Choose before I lift this sticky note.',
'Choose before I lift this note.|What is the average of six, eight, and ten?|Keep your answer in mind while the note stays down. Add the three numbers to get twenty-four, then divide by the three values.|The average is eight. The middle number works here because the values are evenly spaced; the total-over-count method explains why.|Comment the answer you chose first.',
'Peel a sticky-note corner over hidden answer.|Write 6,8,10 above the note.|Hold three seconds; show 24÷3 working.|Lift note to reveal 8.|Replace note as the loop restarts.',
'CHOOSE BEFORE REVEAL|Average: 6, 8, 10|24 ÷ 3|Answer = 8|Your first answer?',
'Original practice; count three values, not two intervals.','Your first answer goes in before the reveal.','average, original quiz, maths');
add(1,'TOFU','The actual welcome to AxomRank','Brand introduction','You can begin with this one question.',
'Your first AxomRank task is here.|You will find questions to attempt and mistakes we explain clearly.|Try this original question: fifteen percent of two hundred. Ten percent is twenty, five percent is ten, and the answer is thirty.|That is the rhythm here: have a go, check the reason, then choose another question. Assam’s exam practice companion starts with practice.|Follow for your next question.',
'Write 15% of 200=? before showing brand mark.|Show small Rang Ghar mark and question options.|Animate 20+10=30 with a short attempt pause.|Show attempt → explanation → next task strip.|End with tomorrow’s question back, answer hidden.',
'YOUR FIRST QUESTION|15% of 200|20 + 10 = 30|Attempt • understand • return|Follow for the next',
'Original practice; no founder credentials or results claims.','A welcome that gives you something to attempt.','AxomRank, ADRE, Assam exam practice');

add(1,'MOFU','Percentage base clinic','Wrong Answer Clinic','That second twenty percent has moved.',
'Your second percentage uses a new base.|Write one hundred, then increase it by twenty percent.|The result is one hundred twenty. A twenty percent decrease now means twenty-four, because we divide twenty by one hundred and multiply by one hundred twenty.|Subtract twenty-four to get ninety-six. Underline the base each time you write a percentage calculation.|Save the method for your next attempt.',
'Circle wrong working “+20 −20=0”.|Write 100×1.2=120.|Circle 120; show 120×0.2=24.|Write 120−24=96 and underline both bases.|Zoom out to corrected workings.',
'THE BASE MOVED|100 becomes 120|20% of 120 = 24|Final = 96|Save the method',
'Original worked example.','Underline the base before you calculate.','percentage, explanation, maths');
add(1,'MOFU','Ratio shares need a total','Maths explanation','The smaller share is not two rupees.',
'Two to three. Divide fifty.|This ratio describes five equal parts, because two plus three is five.|Fifty divided by five gives ten per part. The smaller share takes two parts, so it receives twenty; the larger takes three, so it receives thirty.|Check that twenty plus thirty returns fifty and that the shares still have the requested ratio.|Save this five-box method.',
'Place 2:3 card above ₹50 practice total.|Draw five equal boxes.|Write ₹10 inside each; bracket two versus three.|Reveal ₹20 and ₹30, then sum-check.|Replace values with blank boxes.',
'DIVIDE ₹50|2 + 3 = 5 parts|₹10 per part|₹20 : ₹30|Save the box method',
'Original practice; currency is an arithmetic prop.','Ratios count parts before they divide the total.','ratio, original practice, arithmetic');
add(1,'MOFU','A useful wrong-answer note','Mock review','Your mistake note needs the missing step.',
'Write the step you missed.|A note saying “bad at maths” gives tomorrow’s session very little direction.|For this percentage error, write: I used the original price for the second change. Add the corrected base and one worked line beside it.|Now your review tells you what to check on a similar question. Keep the note short enough to use again.|Save this mistake-note example.',
'Cross out vague note “bad at maths”.|Show a blank review strip.|Write error, correct base and calculation.|Place a similar original question beneath note.|Fold strip into notebook as bookmark.',
'WRITE THE STEP|Avoid vague labels|Error → corrected step|Use on another question|Save this review format',
'Demonstration notebook, not a real learner’s record; label it “example review”.','A mistake note should tell you what to do next.','mock review, mistake notebook, study method');
add(1,'MOFU','Average means total over count','Maths explanation','Why are we dividing by three?',
'Three numbers. Count before dividing.|For six, eight, and ten, begin by adding their values.|Their total is twenty-four, and there are three numbers in the list. Divide twenty-four by three to get an average of eight.|If another value joins the list, both the total and the count can change. Write the count beside your sum.|Save this average-check method.',
'Place three numbered cards under a division sign.|Add 6+8+10=24.|Move three tokens into the denominator; reveal 8.|Add a fourth blank card to show count changes.|Highlight total/count in the notebook.',
'COUNT THE VALUES|6 + 8 + 10 = 24|24 ÷ 3 = 8|New value, new count|Save the method',
'Original arithmetic example; do not imply all averages equal the middle value.','The denominator comes from the number of values.','average, explanation, quantitative aptitude');
add(1,'MOFU','Practice question or PYQ','Question provenance','A question label needs evidence behind it.',
'A PYQ label needs a source.|A newly written practice question can teach well without pretending to be past-paper material.|For a genuine previous-year question, keep the examination name, year, paper, and answer source attached. For our own examples, write “original practice” clearly.|That lets a learner understand what they are revising and where the answer comes from.|Save this question-label checklist.',
'Put ORIGINAL PRACTICE and PYQ labels beside one card.|Move invented question under original practice.|Show blank source fields for a real PYQ.|Tick only a fully sourced record.|End with the two correctly separated labels.',
'CHECK THE LABEL|Original practice|Exam • year • paper • key|Evidence stays attached|Save the checklist',
'Use generic blank source fields unless a real paper and official key are supplied.','A convincing label is not a source.','PYQ, exam sources, practice questions');
add(1,'MOFU','Reading the word except','Question reading','One word can change the answer.',
'Circle the word except first.|This original question asks which number is not even: two, four, five, or eight.|An even number divides by two with no remainder. Two, four, and eight fit that rule, while five leaves a remainder.|Because the question asks for the exception, choose five. Mark the instruction word before evaluating the options.|Save this question-reading reminder.',
'Underline EXCEPT in large type.|Display 2,4,5,8 options.|Show each divided by 2, with remainder for 5.|Circle 5 alongside EXCEPT.|Reset highlight to instruction word.',
'CIRCLE EXCEPT|Which is NOT even?|5 leaves remainder 1|Answer = 5|Save the reminder',
'Original practice; question must use consistent “not even” wording.','The instruction word belongs in your working.','reasoning, question reading, original quiz');
add(1,'MOFU','One sentence explains your answer','Reasoning explanation','Choosing the option is only the start.',
'Explain why you chose thirty-two.|For two, four, eight, and sixteen, this question specifies a doubling rule.|Write that each term is multiplied by two. Applying the same rule to sixteen gives thirty-two, and it matches every earlier transition shown.|Naming the rule makes your choice checkable. If a question specifies a different rule, use that information instead.|Try explaining your next answer aloud.',
'Show answer 32 with an empty reason box.|Display sequence and “each term doubles”.|Draw ×2 arrows between every term.|Fill reason box with one sentence.|Creator points to a new blank reason box.',
'WHERE IS THE REASON?|Rule: each term doubles|16 × 2 = 32|Check earlier transitions|Explain the next answer',
'Original sequence; state rule to avoid claiming a finite sequence has a unique continuation.','An answer becomes clearer when its rule is visible.','number series, reasoning, explanation');
add(1,'MOFU','Check the source under the GK card','Assam GK method','This landmark card needs a source line.',
'Where did this landmark fact come from?|Use Rang Ghar as a worked example of an Assam GK card.|The Sivasagar district page identifies the monument and describes its use for recreation and sports. Keep the monument, place, and purpose together with that source.|Avoid adding a dramatic date or superlative you have not checked. A short sourced card can stay useful.|Save this local-fact card format.',
'Lift a GK card to expose source line.|Show Rang Ghar/place/purpose fields.|Highlight relevant excerpt on district page.|Cross out unsourced “oldest” annotation.|Show concise finished revision card.',
'SHOW THE SOURCE|Rang Ghar • Sivasagar|Pavilion for recreation/sports|Keep claims precise|Save the card format',
'Source S1; reproduce only a short permitted excerpt or paraphrase with attribution.','A source line is part of the lesson.','Assam GK, Rang Ghar, source checking');
add(1,'MOFU','The three-question diagnostic','Beginner practice','Which topic needs your next session?',
'Three questions can guide tonight’s revision.|Try one percentage, one ratio, and one average question before checking answers.|Use fifteen percent of two hundred, fifty split two to three, and the average of six, eight, ten. The answers are thirty, twenty for the smaller share, and eight.|Mark which method you could not explain. That is a specific topic to revisit next.|Choose that topic for your next session.',
'Fan out three topic cards.|Show all three original questions; invite pause.|Reveal compact answers with one-line working.|Creator marks one unknown method.|Move its topic card to tomorrow’s page.',
'CHOOSE TONIGHT’S TOPIC|Percentage • ratio • average|30 • 20 • 8|Which method was unclear?|Revise that topic next',
'Original mini-diagnostic; use a pause prompt because three attempts will take more than the spoken window.','Three attempts can reveal a useful next task.','diagnostic quiz, maths, revision');

add(1,'BOFU','Your first real practice route','Product start','This is where your first attempt begins.',
'Your first attempt starts right here.|Open the practice link in AxomRank’s profile and follow this exact route.|Choose the available set shown on screen. Read its instructions, attempt the first question, then open the explanation at the point the interface allows.|Check the reasoning against your own working. You have a concrete first task before choosing a longer session.|Open the profile link and start this set.',
'Finger points to real profile practice link.|Record the link opening on a phone.|Follow actual set selection and first-question route.|Reveal real explanation with personal data removed.|End on starting screen, set name visible.',
'START HERE|Profile → practice|Read → attempt → check|Compare your working|Start the shown set',
'Capture a working live route and confirm access requirement. Show only a currently available set.','Your first task should be easy to find.','AxomRank, start practice, ADRE');
add(1,'BOFU','What the mock instructions say','Mock start','Read this screen before you press start.',
'Read this before starting the mock.|The available mock has instructions that define the attempt shown here.|Look for its question count, time limit, and scoring rules on the actual screen. Use those details to decide whether this session fits your available time.|Then set aside that time and start the mock. Keep its review step in your session plan too.|Start the shown mock through our profile link.',
'Hover finger above real Start button.|Reveal actual mock instruction screen.|Highlight real count, duration, rules without altering them.|Creator sets a timer matching listed duration.|Finger taps Start on the demonstrated mock.',
'BEFORE YOU START|Read the instructions|Count • time • scoring|Allow review time|Start this mock',
'Confirm a live mock and its rules; no invented duration, scoring or free-access claim.','The instructions tell you what you are starting.','mock tests, AxomRank, practice start');
add(1,'BOFU','See an explanation before choosing','Product evaluation','Check what follows the answer.',
'Look beyond the answer letter.|This is an explanation from the current AxomRank practice experience.|Attempt the displayed question first, then compare the reasoning with your own method. Look for the base, formula, or rule that made the answer work.|That gives you something concrete to evaluate before committing to a longer practice session or an access plan.|Open the linked sample and attempt it.',
'Zoom past real correct-option label to explanation.|Show real question without answer first.|Record explanation scroll; highlight one valid step.|Place handwritten working beside phone.|Return to verified sample entry point.',
'BEYOND THE LETTER|Attempt first|Check the reasoning|Evaluate a real sample|Open the sample',
'Use an accessible, verified sample with explanation; replace CTA destination if sample access changes.','An explanation is something you can inspect.','sample question, AxomRank, explanations');
add(1,'BOFU','Find the topic you just missed','Topic practice','Turn this mistake into your next set.',
'Take this mistake to topic practice.|The percentage question showed that the second calculation used a new base.|Open the currently available percentage set from the route shown here. Attempt its next question independently, then compare your working with the explanation.|Keep the corrected base visible in your notebook. This gives the lesson you just watched a specific follow-up task.|Open the linked percentage practice set.',
'Point from corrected base to real topic menu.|Show notebook’s “percentage base” note.|Record live percentage-set selection and question.|Match-cut notebook working to real explanation.|End on actual percentage-set destination.',
'USE THE CORRECTED BASE|Missed topic: percentage|Open the shown set|Attempt independently|Start topic practice',
'Publish only after verifying a live percentage set and link; otherwise select another available topic and align the lesson.','The next question can use the method you just learned.','topic practice, percentage, AxomRank');
add(1,'BOFU','A profile link that lands on a task','Product navigation','Watch where this practice link takes you.',
'This link lands on a practice task.|You should be able to see what you can attempt when it opens.|We are following the same route a new visitor sees, from the AxomRank profile to the available practice page. Read any sign-in or access requirement shown.|Choose the demonstrated task and keep its explanation for review. The route on screen is the route to follow.|Tap the practice link in our profile.',
'Tap real Instagram bio practice link.|Show uncut opening screen briefly.|Record actual access step and task selection.|Reveal first question and review destination.|Freeze on profile link label.',
'WATCH THE ROUTE|Open the profile link|Follow actual access steps|Choose the shown task|Tap the practice link',
'Test destination on mobile before recording. Do not hide mandatory sign-in or payment steps.','See the full route before your first attempt.','practice link, AxomRank, beginner');
add(1,'BOFU','Ask one specific access question','Product enquiry','Ask us this before choosing your access.',
'Ask what your access actually includes.|A useful enquiry names the exam practice you need and the time you have.|Ask which current option includes the mocks or explanations you want, how long access lasts, and the total price shown. Use the real support route on this screen.|Keep the reply so you can compare it with the available plan information before deciding.|Send your access question through the shown route.',
'Put “What is included?” card beside real support link.|Show a short example enquiry being drafted.|Highlight inclusions, duration and price questions.|Show current plan information, no invented reply.|End on verified support contact route.',
'ASK BEFORE CHOOSING|Name your practice need|Inclusions • duration • price|Compare the details|Send an access enquiry',
'Verify support route and current plan page; use a drafted enquiry, not a fabricated customer exchange.','A specific question gets a more useful access answer.','AxomRank plans, support, enquiry');

// Tighten longer takes while keeping the hook, payoff and CTA intact.
const tighter = {
 'A profile link that lands on a task':[null,null,'Follow the route a visitor sees, from the AxomRank profile to the available practice page. Read the sign-in or access requirement shown.','Choose the demonstrated task and keep its explanation for review. Follow the actual route on screen.'],
 'Ask one specific access question':[null,'Name the exam practice you need and the time you have.',null,'Keep the reply and compare it with the available plan information before deciding.'],
 'The family room gets noisy':[null,'You share the space, and the original plan no longer fits.',null,'Choose another window for the longer task. Your bookmark keeps this attempt ready to resume.'],
 'A mistake without a public score':[null,'Turn the result away and bring one confusing question onto the desk.',null,'Your review can stay private. Sharing a result is optional; understanding the question is today’s task.'],
 'A GK card in a different landscape':[null,'Choose Manas or Kaziranga using this landscape clue.',null,'Location clues ask something different from wildlife clues. Read what the question actually names.'],
 'Pick the next clinic':[null,null,'One changes the percentage base; the other forgets the ratio parts. Point to the step you want explained and say what confused you.','A specific difficulty can become a clear lesson. You do not need to post your score.'],
 'Your explanation becomes the lesson':[null,null,'The ratio is two to three, representing five equal parts. Fifty divided by five gives one part’s value, before assigning two or three parts.','A precise question focuses the explanation on the missing link. Your working can help show it.'],
 'A mock followed by review':[null,null,null,'Compare the explanation with your working and choose a topic. The screen shows the review route.'],
 'Compare plans by your next task':[null,'Name the mock or topic set you need before comparing plans.',null,'Choose an available option after reading its conditions. The screen contains the current offer.'],
 'One question before a longer commitment':[null,null,'Follow the sample route shown here. Make your own attempt, then check whether the explanation clarifies the method. Read any access step before continuing.','Use that experience to evaluate the practice option. Keep your working for the next question.'],
 'Use a planner with a real window':[null,null,'Enter only the fields the current Study Planner supports. Check its output and reduce the task yourself if it exceeds your available time.','Put the selected task in your notebook and attempt its first question. Planning should lead to practice.'],
 'Eligibility tool with the source beside it':[null,'The official exam notice supplies the rules you need to read.','For a supported examination, enter the requested details and inspect the result. Compare its criteria with the official notice and your documents.','Use the tool to begin checking information. Resolve any mismatch before deciding about an application.'],
 'What Document Vault actually offers':[null,null,null,'If the service fits, use the verified enquiry route. Ask about your task before sending files.'],
 'A note to tomorrow’s self':[null,null,null,'When you return, open the intended task directly. The note makes the next start specific.'],
 'Someone keeps the room quiet':[null,'An ordinary favour gives you room for a short practice attempt.','You complete one question while someone handles a small interruption. Check the explanation, write your next task, and thank the person who protected that window.','That support gave you time and space for practice. One ordinary favour became a completed attempt.'],
 'A local sign becomes a question':[null,'You might pass this place name without knowing its story.','Tell us what you want to know about the name or institution. We will choose one question, check an official source, and preserve the spelling.','The next lesson will explain a connection we verified. A familiar sign deserves an accurate story.'],
 'The notebook margin tells the story':[null,null,null,'The answer is fifty centimetres. A unit label makes the missing step visible when you revisit.'],
 'The friend explains a correction':[null,null,'One corrected a percentage base; the other counted all five ratio parts. Each explains the correction, then independently attempts a new question from the partner.','Both leave with a method to check. Keep new answers hidden until each person attempts.'],
 'The creator catches their own typo':[null,'This labelled sample demonstrates how AxomRank should handle an error.',null,'Align the answer and explanation, then show the correction wherever the sample appeared. Students need the corrected version.'],
 'One new question after the series':[null,'Familiar study moments can lead to a clear practice task.','Try this original question: twenty-five percent of one hundred twenty. A quarter of one hundred twenty is thirty. Keep your working before the reveal.','Our next series can begin with a topic you want explained. Bring a specific question.'],
 'Speed needs distance and time':[null,null,'Divide sixty kilometres by two hours. The average speed is thirty kilometres per hour. Keep the units in the fraction to show the rate.'],
 'Undo the plus seven':[null,null,'Subtract seven from both sides. The left becomes x, and the right becomes five, so x equals five. The same operation keeps both sides equal.'],
 'One red token in four':[null,null,'One red and three blue tokens give four equally likely outcomes. The probability of red is one divided by four, or one quarter.'],
 'Forty out of fifty becomes a percentage':[null,null,null,'This is the share correct in this example. It does not predict selection or rank. Label the quantity.'],
 'The arrow only goes one way':[null,'All cats are mammals. The statement does not say all mammals are cats.','Draw cats inside mammals. A cat belongs to the larger group; a mammal can sit outside the cat group. The reversed statement does not follow.'],
 'One verb agrees with he':[null,'Choose “He go daily” or “He goes daily” for simple present.','In standard English, third-person singular he takes goes here. Compare “They go daily,” where they uses go. Keep the subject beside the verb.'],
 'Publish a correction people can find':[null,null,'Verify fifteen percent of two hundred equals thirty. Fix the answer label, add a correction note, and update matching captions or copies that repeat the error.'],
 'A mixed set with three different checks':[null,'Pause for three attempts: a fraction, an equation, and a percentage.','Find a quarter of eighty, solve x plus seven equals twelve, and convert forty out of fifty to a percentage. Answers: twenty, five, eighty percent.','Check equal parts, substitute five, and use fifty as the denominator. Choose the method you missed.'],
 'Return to a specific next set':[null,null,'Follow the current topic route and open the available next set. Keep the corrected method beside your working as you attempt the first question.','Check the explanation and decide your next task. A returning session needs a question you can find.'],
 'Read the checkout details before choosing':[null,'A current plan should show what you buy and how access works.','Check total price, included practice, duration, and the renewal or cancellation terms shown. Compare them with the plan page and ask support about unclear details.'],
 'The route when a learner gets stuck':[null,'Note the exact step if the practice page does not open.','Use the verified support route. Name the set and what the page displayed, keeping passwords and payment details out of the message.','A specific report helps identify the issue. Follow the actual reply before trying the task again.'],
 'Choose tonight’s available practice':[null,'Begin with an available mock or focused topic set.','Open the profile link. Read the access and task instructions, then choose what fits your time. Attempt first and keep one question for review.','Use your review to choose the next topic. The screen shows a current route from watching to practising.']
};
for (const r of chapters.flat()) {
 if (tighter[r[1]]) {
  const n = r[4].split('|');
  tighter[r[1]].forEach((v,i)=>{ if(v!==null) n[i]=v; });
  r[4]=n.join('|');
 }
}
