import type { Game } from "@/types/game";
import { getSupabaseClient } from "./db";

export enum GameStatus {
  Created = "created",
  Deleted = "deleted",
}

export async function insertGame(game: Game) {
  const supabase = getSupabaseClient();
  
  // 首先插入games表
  const { data: gameData, error: gameError } = await supabase
    .from("games")
    .insert({
      uuid: game.uuid,
      slug: game.slug,
      thumbnail_url: game.thumbnail_url,
      game_url: game.game_url,
      is_featured: game.is_featured,
      sort: game.sort,
      created_at: new Date().toISOString()
    })
    .select('id')
    .single();

  if (gameError) throw gameError;

  // 然后插入game_translations表
  const { data: translationData, error: translationError } = await supabase
    .from("game_translations")
    .insert({
      game_id: gameData.id,
      locale: 'en', // 默认英语
      title: game.title,
      description: game.description,
      created_at: new Date().toISOString()
    });

  if (translationError) throw translationError;
  return gameData;
}

export async function findGameByUuid(
  uuid: string
): Promise<Game | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("games")
    .select(`
      *,
      game_translations (
        title,
        description
      )
    `)
    .eq("uuid", uuid)
    .single();

  if (!data) return undefined;
  // 转换为Project格式
  return {
    uuid: data.uuid,
    slug: data.slug,
    title: data.game_translations[0]?.title,
    description: data.game_translations[0]?.description,
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    locale: data.locale,
    thumbnail_url: data.thumbnail_url,
    game_url: data.game_url,
    is_featured: data.is_featured,
    is_home_game: data.is_home_game,
    sort: data.sort,
    created_at: data.created_at
  };
}

export async function findGameBySlug(
  slug: string,
  locale: string
): Promise<Game | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("games")
    .select(`
      *,
      game_translations!inner(
        title,
        description,
        meta_title,
        meta_description,
        keywords,
        locale
      ),
      categories:category_uuid(
        uuid,
        slug,
        category_translations!inner(
          name,
          description,
          meta_title,
          meta_description,
          keywords
        )
      )
    `)
    .eq("slug", slug)
    .eq("game_translations.locale", locale)
    .eq("categories.category_translations.locale", locale)
    .single();

  if (!data) return undefined;

  // 转换为Game格式
  return {
    uuid: data.uuid,
    slug: data.slug,
    title: data.game_translations[0]?.title,
    description: data.game_translations[0]?.description,
    meta_title: data.game_translations[0]?.meta_title,
    meta_description: data.game_translations[0]?.meta_description,
    keywords: data.game_translations[0]?.keywords,
    thumbnail_url: data.thumbnail_url,
    game_url: data.game_url,
    is_featured: data.is_featured,
    is_home_game: data.is_home_game,
    sort: data.sort,
    created_at: data.created_at,
    locale: data.game_translations[0]?.locale,
    category: data.categories ? {
      uuid: data.categories.uuid,
      slug: data.categories.slug,
      name: data.categories.category_translations[0]?.name,
      description: data.categories.category_translations[0]?.description,
      meta_title: data.categories.category_translations[0]?.meta_title,
      meta_description: data.categories.category_translations[0]?.meta_description,
      keywords: data.categories.category_translations[0]?.keywords
    } : null
  };
}

export async function getGames(
  page: number,
  limit: number
): Promise<Game[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("games")
    .select(`
      *,
      game_translations (
        title,
        description
      )
    `)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];
  // 转换数据格式
  return data.map(game => ({
    uuid: game.uuid,
    slug: game.slug,
    title: game.game_translations[0]?.title,
    description: game.game_translations[0]?.description,
    is_featured: game.is_featured,
    thumbnail_url: game.thumbnail_url,
    game_url: game.game_url,
    is_home_game: game.is_home_game,
    sort: game.sort,
    created_at: game.created_at,
    meta_title: game.game_translations[0]?.meta_title,
    meta_description: game.game_translations[0]?.meta_description,
    locale: game.game_translations[0]?.locale || 'en'
  }));
}

export async function getGamesCount(): Promise<number> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("games").select("count");

  if (error) return 0;

  return data?.[0]?.count || 0;
}

export async function getFeaturedGames(
  page: number,
  limit: number
): Promise<Game[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("is_featured", true)
    .eq("status", GameStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getRandomGames(
  page: number,
  limit: number
): Promise<Game[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("status", GameStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data.sort(() => Math.random() - 0.5);
}

export async function getGamesWithKeyword(
  keyword: string,
  page: number,
  limit: number
): Promise<Game[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("games")
    .select("*")
    .or(
      `name.ilike.%${keyword}%,title.ilike.%${keyword}%,description.ilike.%${keyword}%`
    )
    .eq("status", GameStatus.Created)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  return data;
}

export async function getGamesWithoutSummary(
  page: number,
  limit: number
): Promise<Game[]> {
  const pageNumber = page || 1;
  const limitNumber = limit || 20;

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .is("summary", null)
    .eq("status", GameStatus.Created)
    .range((pageNumber - 1) * limitNumber, pageNumber * limitNumber - 1);

  if (error) return [];

  return data;
}

export async function getGamesWithTranslation(
  page: number,
  limit: number,
  locale: string
): Promise<Game[]> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("games")
    .select(`
      *,
      game_translations!inner(
        title,
        description,
        meta_title,
        meta_description,
        keywords,
        locale
      ),
      categories:category_uuid(
        uuid,
        slug,
        category_translations!inner(
          name,
          description,
          meta_title,
          meta_description,
          keywords
        )
      )
    `)
    .eq("game_translations.locale", locale)
    .eq("categories.category_translations.locale", locale)
    .order("sort", { ascending: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (error) return [];

  // 转换数据格式
  return data.map(game => ({
    uuid: game.uuid,
    slug: game.slug,
    title: game.game_translations[0]?.title,
    description: game.game_translations[0]?.description,
    meta_title: game.game_translations[0]?.meta_title,
    meta_description: game.game_translations[0]?.meta_description,
    keywords: game.game_translations[0]?.keywords,
    thumbnail_url: game.thumbnail_url,
    game_url: game.game_url,
    is_featured: game.is_featured,
    is_home_game: game.is_home_game,
    sort: game.sort,
    created_at: game.created_at,
    locale: game.game_translations[0]?.locale,
    category: game.categories ? {
      uuid: game.categories.uuid,
      slug: game.categories.slug,
      name: game.categories.category_translations[0]?.name,
      description: game.categories.category_translations[0]?.description,
      meta_title: game.categories.category_translations[0]?.meta_title,
      meta_description: game.categories.category_translations[0]?.meta_description,
      keywords: game.categories.category_translations[0]?.keywords
    } : null
  }));
}

export async function updateGame(uuid: string, game: Partial<Game>) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("games")
    .update(game)
    .eq("uuid", uuid);

  if (error) throw error;

  return data;
}
