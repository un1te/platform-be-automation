import axios from 'axios';
import process from "node:process";
import path from 'path';
import * as fs from "node:fs";

function getCookie(key: string) {
    // Retrieve cookie from auth file
    // This is used to get session tokens from stored authentication
    const authFilePath = '.auth/user.json';
    const filePath = path.resolve(authFilePath);
    
    if (!fs.existsSync(filePath)) {
        throw new Error(`Auth file not found at ${filePath}. Please run setup first.`);
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const authData = JSON.parse(fileContents);
    const cookie = authData.cookies.find((cookie: any) => cookie.name === key)?.value;
    
    if (!cookie) {
        throw new Error(`Cookie '${key}' not found in auth file`);
    }
    
    return cookie;
}

export async function getToken() {
    //  token retrieval
    const response = await axios.get(process.env.BASE_URL + 'api/auth/session', {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `__Host-auth-csrf-token=${getCookie('__Host-auth-csrf-token')}; __Secure-auth-session-token=${getCookie('__Secure-auth-session-token')}`,
            }
        }
        )
    return response.data.accessToken;
}

export async function getAxiosInstance() {
    return axios.create({
        baseURL: process.env.API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getToken()}`,
        },
    });
}