import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { post } from 'axios';

const hardCodeQuotes = ['You’re off to great places, today is your day. Your mountain is waiting, so get on your way - Dr. Seuss',
'You always pass failure on the way to success. - Mickey Rooney', 
'No one is perfect, that’s why pencils have erasers. - Wolfgang Riebe', 
'Winning doesn’t always mean being first. Winning means you’re doing better than you’ve done before. - Bonnie Blair', 
'It always seems impossible until it is done. - Nelson Mandela', 
'Keep your face to the sunshine and you cannot see a shadow. -  Helen Keller', 
'Once you replace negative thoughts with positive ones, you’ll start having positive results. - Willie Nelson',
'Positive thinking will let you do everything better than negative thinking will. - Zig Ziglar',
'In every day, there are 1,440 minutes. That means we have 1,440 daily opportunities to make a positive impact. - Les Brown', 
'The only time you fail is when you fall down and stay down. - Stephen Richards',
'When you are enthusiastic about what you do, you feel this positive energy. It’s very simple. - Paulo Coelho',
'Positive anything is better than negative nothing. - Elbert Hubbard',
'Winning is fun, but those moments that you can touch someone’s life in a very positive way are better. - Tim Howard',
'Virtually nothing is impossible in this world if you just put your mind to it and maintain a positive attitude. - Lou Holtz',
'Optimism is a happiness magnet. If you stay positive good things and good people will be drawn to you. - Mary Lou Retton',
'It makes a big difference in your life when you stay positive. - Ellen DeGeneres',
'If opportunity doesn’t knock, build a door. - Milton Berle',
'Happiness is an attitude. We either make ourselves miserable, or happy and strong. The amount of work is the same. - Francesca Reigler',
'You are never too old to set another goal or dream a new dream. - Les Brown',
'The sun himself is weak when he first rises, and gathers strength and courage as the day gets on. - Charles Dickens',
'It’s not whether you get knocked down, it’s whether you get up. - Vince Lombardi',
'The struggle you’re in today is developing the strength you need tomorrow. - Robert Tew',
'The way I see it, if you want the rainbow, you gotta put up with the rain. - Dolly Parton' ,
'Every day may not be good... but there’s something good in every day. - Alice Morse Earle',
'The more you praise and celebrate your life, the more there is in life to celebrate. - Oprah Winfrey',
'Hard work keeps the wrinkles out of the mind and spirit. - Helena Rubinstein',
'The difference between ordinary and extraordinary is that little extra. - Jimmy Johnson',
'Success is the sum of small efforts repeated day in and day out. - Robert Collier',
'When we are open to new possibilities, we find them. Be open and skeptical of everything. - Todd Kashdan',
'Happiness is the only thing that multiplies when you share it. - Albert Schweitzer',
'The good life is a process, not a state of being. It is a direction, not a destination. - Carl Rogers',
'The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius',
'Live life to the fullest and focus on the positive - Matt Cameron',
'Great things never come from comfort zones. - Anon',
'Your limitation—it is only your imagination. - Anon',
'Wake up with determination. Go to bed with satisfaction. - Anon',
'Do something today that your future self will thank you for. - Anon',
'Little things make big days. - Anon',
'It is going to be hard, but hard does not mean impossible. - Anon',
'Do not wait for opportunity. Create it. - Anon',
'Sometimes we are tested not to show our weaknesses, but to discover our strengths. - Anon',
'The key to success is to focus on goals, not obstacles. - Anon',
'Dream it. Believe it. Build it. - Anon',
'The Way Get Started Is To Quit Talking And Begin Doing. - Walt Disney',
'Do not Let Yesterday Take Up Too Much Of Today. - Will Rogers',
'If You Are Working On Something That You Really Care About, You Don’t Have To Be Pushed. The Vision Pulls You. - Steve Jobs',
'People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do. - Rob Siltanen',
'Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough. - Og Mandino',
'We May Encounter Many Defeats But We Must Not Be Defeated. - Maya Angelou',
'Knowing Is Not Enough; We Must Apply. Wishing Is Not Enough; We Must Do. - Johann Wolfgang Von Goethe',
'We Generate Fears While We Sit. We Overcome Them By Action. - Dr. Henry Link',
'Whether You Think You Can Or Think You Can’t, You’re Right. -  Henry Ford',
'Security Is Mostly A Superstition. Life Is Either A Daring Adventure Or Nothing. - Helen Keller',
'The Man Who Has Confidence In Himself Gains The Confidence Of Others. - Hasidic Proverb',
'The Only Limit To Our Realization Of Tomorrow Will Be Our Doubts Of Today. - Franklin D. Roosevelt',
'Creativity Is Intelligence Having Fun. - Albert Einstein',
'What You Lack In Talent Can Be Made Up With Desire, Hustle And Giving 110% All The Time. - Don Zimmer',
'Do What You Can With All You Have, Wherever You Are. - Theodore Roosevelt',
'Develop An ‘Attitude Of Gratitude’. Say Thank You To Everyone You Meet For Everything They Do For You. - Brian Tracy',
'You Are Never Too Old To Set Another Goal Or To Dream A New Dream. - C.S. Lewis',
'To See What Is Right And Not Do It Is A Lack Of Courage. - Confucius',
'Reading Is To The Mind, As Exercise Is To The Body. - Brian Tracy',
'I cannot give you a formula for success, but I can give you the formula for failure, which is: Try to please everybody. - Herbert Bayard Swope',
'Show me the man you honor and I will know what kind of man you are. - Thomas John Carlisle',
'A man always has two reasons for doing anything: a good reason and the real reason. - J.P. Morgan',
'If you spend your life trying to be good at everything, you will never be great at anything. - Tom Rath',
'Average leaders raise the bar on themselves; good leaders raise the bar for others; great leaders inspire others to raise their own bar. - Orrin Woodward',
'Don’t blow off another’s candle for it won’t make yours shine brighter. - Jaachynma N.E. Agu',
'Whenever you see a successful business, someone once made a courageous decision. - Peter F. Drucker',
'When you put together deep knowledge about a subject that intensely matters to you, charisma happens. You gain courage to share your passion, and when you do that, folks follow. - Jerry Porras',
'People buy into the leader before they buy into the vision. - John Maxwell',
'A good leader is a person who takes a little more than his share of the blame and a little less than his share of the credit. - John Maxwell',
'I alone cannot change the world, but I can cast a stone across the water to create many ripples. - Mother Teresa',
'Whether you think you can or you think you can’t, you’re right. - Henry Ford',
'If you are not willing to risk the unusual, you will have to settle for the ordinary. - Jim Rohn',
'Take up one idea. Make that one idea your life-think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success. - Swami Vivekananda',
'If you are willing to do more than you are paid to do, eventually you will be paid to do more than you do. - Anonymous',
'Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill',
'Whatever the mind of man can conceive and believe, it can achieve. - Napoleon Hill',
'Whenever you see a successful person, you only see the public glories, never the private sacrifices to reach them. - Vaibhav Shah',
'Try not to become a person of success, but rather try to become a person of value. - Albert Einstein',
'Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau',
'Great minds discuss ideas; average minds discuss events; small minds discuss people. - Eleanor Roosevelt',
'I am not a product of my circumstances. I am a product of my decisions. - Stephen Covey',
'When everything seems to be going against you, remember that the airplane takes off against the wind, not with it. - Henry Ford',
'No one can make you feel inferior without your consent. - Eleanor Roosevelt',
'The distance between insanity and genius is measured only by success. - Bruce Feirstein',
'Don’t be afraid to give up the good to go for the great. - John D. Rockefeller',
'If you can’t explain it simply, you don’t understand it well enough. - Albert Einstein',
'There are two types of people who will tell you that you cannot make a difference in this world: those who are afraid to try and those who are afraid you will succeed. - Ray Goforth',
'Success is the sum of small efforts, repeated day in and day out. - Robert Collier',
'The most common way people give up their power is by thinking they don’t have any. - Alice Walker',
'The most difficult thing is the decision to act, the rest is merely tenacity. - Amelia Earhart',
'It is during our darkest moments that we must focus to see the light. - Aristotle Onassis',
'Don’t judge each day by the harvest you reap but by the seeds that you plant. - Robert Louis Stevenson',
'Courage is resistance to fear, mastery of fear — not absence of fear. - Mark Twain',
'Only put off until tomorrow what you are willing to die having left undone. - Pablo Picasso',
'Twenty years from now, you will be more disappointed by the things that you didn’t do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover. - Mark Twain',
'Remember that not getting what you want is sometimes a wonderful stroke of luck. - Dalai Lama',
'The successful warrior is the average man, with laserlike focus. - Bruce Lee',
'You can’t connect the dots looking forward; you can only connect them looking backward. So you have to trust that the dots will somehow connect in your future. You have to trust in something — your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life. - Steve Jobs',
'Successful people do what unsuccessful people are not willing to do. Don’t wish it were easier; wish you were better. - Jim Rohn',
'The No. 1 reason people fail in life is because they listen to their friends, family, and neighbors. - Napoleon Hill',
'Many of life’s failures are people who did not realize how close they were to success when they gave up. - Thomas A. Edison',
'What would you attempt to do if you knew you would not fail? - Robert Schuller',
'Always bear in mind that your own resolution to success is more important than any other one thing. - Abraham Lincoln',
'Successful and unsuccessful people do not vary greatly in their abilities. They vary in their desires to reach their potential. - John Maxwell',
'I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel. - Maya Angelou',
'Much of the stress that people feel doesn’t come from having too much to do. It comes from not finishing what they’ve started. - David Allen',
'Focus on the journey, not the destination. Joy is found not in finishing an activity but in doing it. - Greg Anderson',
'Success at the highest level comes down to one question: Can you decide that your happiness can come from someone else’s success? - Bill Walton',
'Do what you have always done and you’ll get what you have always got. - Sue Knight',
'Think of what you have rather than of what you lack. Of the things you have, select the best and then reflect how eagerly you would have sought them if you did not have them. - Marcus Aurelius',
'Happiness is where we find it, but very rarely where we seek it. - J. Petit Senn',
'You never regret being kind. - Nicole Shepherd',
'To be content means that you realize you contain what you seek. - Alan Cohen',
'Expecting life to treat you well because you are a good person is like expecting an angry bull not to charge because you are a vegetarian. - Shari R. Barr',
'View your life from your funeral: Looking back at your life experiences, what have you accomplished? What would you have wanted to accomplish but didn’t? What were the happy moments? What were the sad? What would you do again, and what wouldn’t you do? - Victor Frankl',
'Boredom is the feeling that everything is a waste of time… serenity, that nothing is. - Thomas Szasz',
'To handle yourself, use your head; to handle others, use your heart. - Eleanor Roosevelt',
'The mediocre teacher tells. The good teacher explains. The superior teacher demonstrates. The great teacher inspires. - William Arthur Ward',
'It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change. - Charles Darwin',
'Keep your fears to yourself, but share your courage with others. - Robert Louis Stevenson',
'I can’t change the direction of the wind, but I can adjust my sails to always reach my destination. - Jimmy Dean',
'I have learned over the years that when one’s mind is made up, this diminishes fear. - Rosa Parks',
'Victory has a hundred fathers and defeat is an orphan. - John F. Kennedy',
'Management is doing things right; leadership is doing the right things. - Peter F. Drucker',
'Example is not the main thing in influencing others. It is the only thing. - Albert Schweitzer',
'Leaders must be close enough to relate to others, but far enough ahead to motivate them. - John C. Maxwell',
'The mark of a great man is one who knows when to set aside the important things in order to accomplish the vital ones. - Brandon Sanderson',
'If you want to lift yourself up, lift up someone else. - Booker T. Washington',
'You have to be burning with an idea, or a problem, or a wrong that you want to right. If you’re not passionate enough from the start, you’ll never stick it out. - Steve Jobs',
'A person who never made a mistake never tried anything new. - Albert Einstein',
'The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson',
'Everything you’ve ever wanted is on the other side of fear. - George Addair',
'Being responsible sometimes means pissing people off. - Colin Powell',
'Change your thoughts and you change your world. - Norman Vincent Peale',
'How wonderful it is that nobody need wait a single moment before starting to improve the world. - Anne Frank',
'Life is 10% what happens to me and 90% of how I react to it. - Charles Swindoll',
'Perfection is not attainable, but if we chase perfection we can catch excellence. - Vince Lombardi',
'You get in life what you have the courage to ask for. - Nancy D. Solomon',
'In the end, it is important to remember that we cannot become what we need to be by remaining what we are. - Max De Pree',
'Believe you can and you’re halfway there. - Theodore Roosevelt',
'Too many of us are not living our dreams because we are living our fears. - Les Brown',
'If you really want the key to success, start by doing the opposite of what everyone else is doing. - Brad Szollose',
'What we achieve inwardly will change outer reality. - Plutarch',
'A good plan violently executed now is better than a perfect plan executed next week. - George Patton',
'Feeling gratitude and not expressing it is like wrapping a present and not giving it. - William Arthur Ward',
'Silent gratitude isn’t very much to anyone. - Gertrude Stein',
'The only people with whom you should try to get even are those who have helped you. - John E. Southard',
'Keep your eyes open and try to catch people in your company doing something right, then praise them for it. - Tom Hopkins',
'You wouldn’t worry so much about what others think of you if you realized how seldom they do. - Eleanor Roosevelt',
'Shyness has a strange element of narcissism, a belief that how we look, how we perform, is truly important to other people. - Andre Dubus',
'Do or do not. There is no try. - Yoda',
'Rarely have I seen a situation where doing less than the other guy is a good strategy. - Jimmy Spithill',
'The best revenge is massive success. - Frank Sinatra',
'The only way to do great work is to love what you do. - Steve Jobs',
'If you would convince a man that he does wrong, do right. But do not care to convince him. Men will believe what they see. Let them see. - Henry David Thoreau',
'Low self confidence isn’t a life sentence. Self confidence can be learned, practiced, and mastered just like any other skill. Once you master it, everything in your life will change for the better. - Barrie Davenport' ]

function QuoteList() {

    const [quotes, setQuotes] = useState([]);

    useEffect(function() {
        async function getQuotes() {
            try {
                const response = await axios.get("/api/quotes");
                setQuotes(response.data); 
            } catch(error) {
                console.log('error', error);
            }
        }
        getQuotes();
    }, []);



    function addAllquotes (){
        function addQuote() {
             hardCodeQuotes.map(quote => {
                let testQuote = quote.split('-') 
                let fullQuote = testQuote[0].trim();
                let author = testQuote[1].trim();
                try {
                let quote = {
                    quote: fullQuote,
                    author: author
                 }
                 console.log('quote', quote);
                const response = post('/api/quotes', quote)
                } catch(error) {
                console.log('error', error);
                }
            });
        }
        addQuote();
    }

    return (
        <div>
            <h2>
            Quotes
            <Link to="/quotes/new" className="btn btn-primary float-right">Create Quote</Link>
            <button className="btn btn-primary float-right" onClick={addAllquotes}>Add All quotes</button>
            </h2>
            <hr/>
            {quotes.map((quote) => {
                return(
                    <div key={quote._id}>
                    <h4><Link to={`/quotes/${quote._id}`}>{quote.quote}</Link></h4>
                    <p>{quote.author}</p>
                    <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default QuoteList;