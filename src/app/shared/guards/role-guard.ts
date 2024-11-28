import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../login/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const decodedToken = authService.getDecodedToken();

    if (decodedToken) {
        const userRole = decodedToken.scope;
        const expectedRoles = route.data['expectedRoles'] as Array<string>;

        if (route.routeConfig?.path === 'home') {
            return expectedRoles.includes(userRole);
        }

        if (expectedRoles.includes('ROLE_PACIENTE') && userRole === 'ROLE_PACIENTE') {
            const patientId = route.paramMap.get('id');
            if (patientId === decodedToken.sub) {
                return true;
            }
        }

        return expectedRoles.includes(userRole);
    }

    return false;
};
