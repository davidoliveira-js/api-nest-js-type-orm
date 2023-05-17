import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signOut(req: any, data: {
        refreshToken: string;
    }): Promise<void>;
}
