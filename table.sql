DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS player_images CASCADE;
-- Create the games table
CREATE TABLE public.games (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'waiting',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  game_state JSONB DEFAULT '{}'::JSONB
);

-- Create the player_images table
CREATE TABLE public.player_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  index INTEGER NOT NULL,
  image TEXT NOT NULL,
  selected BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable row level security
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow all operations" ON public.games FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON public.player_images FOR ALL USING (true);

CREATE TABLE public.dictionary(
  maori TEXT,
  english text
)
  
SELECT append_player_to_game('6088ae52-74a5-4ce3-8917-8fc814609887', 'Player1');

CREATE OR REPLACE FUNCTION append_player_to_game(p_game_id uuid, p_player_name text)
RETURNS SETOF games
language plpgsql
AS $$
DECLARE
  v_game games; -- Variable to hold the game record
  v_colors TEXT[] := ARRAY['red', 'blue', 'green', 'yellow']; -- Array of available colors
  v_player_count INTEGER; -- Variable to hold the count of players in the game
BEGIN
  -- Fetch the game and lock it for update
  SELECT *
  INTO v_game
  FROM games
  WHERE id = p_game_id
  FOR UPDATE;

  -- Check if the game exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Game with ID % not found', p_game_id;
  END IF;

  -- -- Check the number of players already in the game
  -- SELECT COUNT(*)
  -- INTO v_player_count
  -- FROM players
  -- WHERE game_id = p_game_id;

  -- -- Assume a limit of 4 players per game
  -- IF v_player_count >= 4 THEN
  --   RAISE EXCEPTION 'Game with ID % is full', p_game_id;
  -- END IF;

  -- -- Assign a color to the new player based on the current player count
  -- INSERT INTO players (game_id, player_name, color)
  -- VALUES (p_game_id, p_player_name, v_colors[v_player_count + 1]);

  -- Return the updated game record
  RETURN QUERY SELECT * FROM games WHERE id = p_game_id;
END;
$$;