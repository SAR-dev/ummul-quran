import { AvatarType } from "./avatar";

export interface UserType {
    id: number;
    email: string;
    username: string;
    name?: string;
    contact_no?: string;
    contact_email?: string;
    nick_name?: string;
    gender?: string;
    location?: string;
    utc: number;
    whatsapp_no?: string;
    role: string;
    images_id: number;
    created_at: Date;
    updated_at: Date;
    avatar: AvatarType;
}

export interface UserUpdateType {
    name?: string;
    contact_no?: string;
    contact_email?: string;
    residence?: string;
    facebook_id?: string;
    youtube_id?: string;
    twitter_id?: string;
    images_id?: number;
}