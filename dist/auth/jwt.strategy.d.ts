import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: {
        id: string;
        username: string;
        roles: string[];
    }): Promise<{
        id: string;
        username: string;
        roles: string[][];
    }>;
}
export {};
