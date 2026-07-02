import { Router, Request, Response } from 'express';
import axios from 'axios';
import { z } from 'zod';

const router = Router();

// Local jokes database with mixed categories
const localJokes = [
  {
    text: "Why did the money go to school? Because it wanted to get some change!",
    type: 'single' as const,
    category: 'money',
  },
  {
    text: "What did the dollar bill say to the other dollar bill? You're worth your weight in gold!",
    type: 'single' as const,
    category: 'money',
  },
  {
    text: "I told my financial advisor I wanted to make a million. He said, 'Good luck, you're 100 short already!'",
    type: 'single' as const,
    category: 'money',
  },
  {
    text: "Why don't eggs tell jokes? Because they'd crack each other up! Wait, that's not about money...",
    type: 'single' as const,
    category: 'general',
  },
  {
    text: "A programmer, a manager, and a director are riding in a car. Who's driving? The manager—programmers don't have the keys to success!",
    type: 'single' as const,
    category: 'programming',
  },
  {
    text: "My wallet is like a gym membership—I haven't used it in months, but I'm still paying for it.",
    type: 'single' as const,
    category: 'money',
  },
  {
    text: "What's the difference between a rich person and a poor person? The rich person has money jokes, the poor person IS the joke.",
    type: 'single' as const,
    category: 'money',
  },
  {
    text: "I'm so broke, my bank account is like a horror movie—just a bunch of overdraft fees and screaming.",
    type: 'single' as const,
    category: 'money',
  },
  {
    text: "Why did Bitcoin break up with his girlfriend? Because he found another blockchain!",
    type: 'single' as const,
    category: 'programming',
  },
  {
    text: "My credit card called me yesterday. It wanted to warn me about suspicious activity—mainly from me!",
    type: 'single' as const,
    category: 'money',
  },
];

// Money and finance wisdom quotes
const moneyQuotes = [
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
    author: "Chinese Proverb",
    category: "wisdom",
  },
  {
    text: "Money is not the most important thing in the world. But it's reasonably close to oxygen on the 'gotta have it' list.",
    author: "Zig Ziglar",
    category: "money",
  },
  {
    text: "Don't go to bed with a problem that can be solved by a phone call.",
    author: "Zig Ziglar",
    category: "wisdom",
  },
  {
    text: "The richest people focus on their hourly rate.",
    author: "Naval Ravikant",
    category: "money",
  },
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
    category: "money",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
  },
  {
    text: "Compound interest is the eighth wonder of the world. He who understands it, earns it. He who doesn't, pays it.",
    author: "Albert Einstein",
    category: "money",
  },
  {
    text: "It is not the man who has too little, but the man who craves more, that is poor.",
    author: "Seneca",
    category: "wisdom",
  },
  {
    text: "The greatest wealth is a poverty of desires.",
    author: "Seneca",
    category: "wisdom",
  },
  {
    text: "Your network is your net worth.",
    author: "Porter Gale",
    category: "business",
  },
  {
    text: "The more you learn, the more you earn.",
    author: "Frank Clark",
    category: "education",
  },
  {
    text: "Money can't buy happiness, but it can buy ice cream, which is basically the same thing.",
    author: "Unknown",
    category: "humor",
  },
  {
    text: "A penny saved is a penny earned.",
    author: "Benjamin Franklin",
    category: "money",
  },
  {
    text: "Don't put all your eggs in one basket.",
    author: "Unknown",
    category: "investing",
  },
  {
    text: "The best investment is in yourself.",
    author: "Warren Buffett",
    category: "education",
  },
];

interface InspirationResponse {
  id: string;
  type: 'joke' | 'quote';
  text: string;
  author?: string;
  category: string;
}

/**
 * GET /api/inspiration/random
 * Returns a random inspiration (joke or quote)
 * Predominantly returns money-related or financial content
 */
router.get('/random', async (req: Request, res: Response): Promise<void> => {
  try {
    const randomSelector = Math.random();
    let inspiration: InspirationResponse | null = null;

    // 70% chance for local jokes/quotes, 30% chance for external API
    if (randomSelector < 0.7) {
      // Use local data
      const useJoke = Math.random() > 0.4; // 60% jokes, 40% quotes

      if (useJoke) {
        const selectedJoke = localJokes[Math.floor(Math.random() * localJokes.length)];
        inspiration = {
          id: `${Date.now()}-${Math.random()}`,
          type: 'joke',
          text: selectedJoke.text,
          category: selectedJoke.category,
        };
      } else {
        const selectedQuote = moneyQuotes[Math.floor(Math.random() * moneyQuotes.length)];
        inspiration = {
          id: `${Date.now()}-${Math.random()}`,
          type: 'quote',
          text: selectedQuote.text,
          author: selectedQuote.author,
          category: selectedQuote.category,
        };
      }
    } else {
      // Try to fetch from external API
      try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?format=json', {
          timeout: 3000,
        });

        const jokeText =
          response.data.type === 'twopart'
            ? `${response.data.setup}\n\n${response.data.delivery}`
            : response.data.joke || '';

        inspiration = {
          id: `${Date.now()}-${Math.random()}`,
          type: 'joke',
          text: jokeText,
          category: response.data.category || 'general',
        };
      } catch (error) {
        // Fallback to local data if API fails
        const selectedJoke = localJokes[Math.floor(Math.random() * localJokes.length)];
        inspiration = {
          id: `${Date.now()}-${Math.random()}`,
          type: 'joke',
          text: selectedJoke.text,
          category: selectedJoke.category,
        };
      }
    }

    res.status(200).json({
      success: true,
      data: inspiration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * GET /api/inspiration/batch
 * Returns multiple random inspirations
 */
router.get('/batch', async (req: Request, res: Response): Promise<void> => {
  try {
    const countParam = req.query.count ? parseInt(req.query.count as string) : 10;
    const count = Math.min(Math.max(countParam, 1), 20);

    const inspirations: InspirationResponse[] = [];

    for (let i = 0; i < count; i++) {
      const useJoke = Math.random() > 0.3; // 70% jokes, 30% quotes

      if (useJoke) {
        const selectedJoke = localJokes[Math.floor(Math.random() * localJokes.length)];
        inspirations.push({
          id: `${Date.now()}-${i}-${Math.random()}`,
          type: 'joke',
          text: selectedJoke.text,
          category: selectedJoke.category,
        });
      } else {
        const selectedQuote = moneyQuotes[Math.floor(Math.random() * moneyQuotes.length)];
        inspirations.push({
          id: `${Date.now()}-${i}-${Math.random()}`,
          type: 'quote',
          text: selectedQuote.text,
          author: selectedQuote.author,
          category: selectedQuote.category,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: inspirations,
      count: inspirations.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

/**
 * GET /api/inspiration/quotes
 * Returns only money and wisdom quotes
 */
router.get('/quotes', async (req: Request, res: Response): Promise<void> => {
  try {
    const countParam = req.query.count ? parseInt(req.query.count as string) : 5;
    const count = Math.min(Math.max(countParam, 1), moneyQuotes.length);

    const selectedQuotes = [];
    const usedIndices = new Set<number>();

    while (selectedQuotes.length < count) {
      const index = Math.floor(Math.random() * moneyQuotes.length);
      if (!usedIndices.has(index)) {
        usedIndices.add(index);
        const quote = moneyQuotes[index];
        selectedQuotes.push({
          id: `${Date.now()}-${selectedQuotes.length}-${Math.random()}`,
          type: 'quote' as const,
          text: quote.text,
          author: quote.author,
          category: quote.category,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: selectedQuotes,
      count: selectedQuotes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;
