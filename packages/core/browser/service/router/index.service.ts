import { routify } from './routes';

import type { Router, RouteLocationRaw, NavigationFailure, RouteLocationNormalizedLoaded } from 'vue-router';


type RouteChangeResult = Promise<NavigationFailure | void | undefined>;
export interface RouterServiceAPI {
    getRouterConfig(): Router;
    push(to: RouteLocationRaw): RouteChangeResult;
    replace(to: RouteLocationRaw): RouteChangeResult;
    currentRoute(): RouteLocationNormalizedLoaded;
    back(): void;
}


// control all initial logic inside the module
let instance:symbol;

export class RouterService implements RouterServiceAPI {

    private constructor(private router: Router, token: symbol) {
        if (!token) {
            throw new Error('can\'t initiate RouterService outside the module');
        }
    }

    static create() {
        if (!instance) {
            instance = Symbol.for('router-instance');
        }
        return new RouterService(routify(), instance);
    }

    getRouterConfig() {
        return this.router;
    }

    push(to: RouteLocationRaw) {
        return this.router.push(to);
    }

    replace(to: RouteLocationRaw) {
        return this.router.replace(to);
    }

    currentRoute() {
        return this.router.currentRoute.value;
    }

    back() {
        return this.router.back();
    }
}

