import type { User } from "@/types/user";
import { getSupabaseClient } from "./db";

export async function insertUser(user: User) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("users").insert(user);

  if (error) throw error;
  return data;
}

export async function findUserByEmail(
  email: string,
  signin_provider: string
): Promise<User | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("signin_provider", signin_provider)
    .single();

  if (!data) return undefined;

  return formatUser(data);
}

export async function findUserByUuid(uuid: string): Promise<User | undefined> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("uuid", uuid)
    .single();

  if (!data) return undefined;

  return formatUser(data);
}

type UserRow = {
  uuid: string;
  email: string;
  created_at: string;
  nickname: string;
  avatar_url: string;
  locale: string;
  signin_type: string;
  signin_ip: string;
  signin_provider: string;
  signin_openid: string;
};

export function formatUser(row: UserRow): User {
  const user: User = {
    uuid: row.uuid,
    email: row.email,
    created_at: row.created_at,
    nickname: row.nickname,
    avatar_url: row.avatar_url,
    locale: row.locale,
    signin_type: row.signin_type,
    signin_ip: row.signin_ip,
    signin_provider: row.signin_provider,
    signin_openid: row.signin_openid,
  };

  return user;
}
