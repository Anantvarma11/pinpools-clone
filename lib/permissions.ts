import { RFX, RFXInvite } from '@prisma/client';

type User = {
    id: string;
    email?: string | null;
};

type RFXWithInvites = RFX & {
    invites: RFXInvite[];
};

export function canAccessRfx(user: User, rfx: RFXWithInvites) {
    // 1. Public RFX
    if (rfx.mode === 'PUBLIC') {
        return true;
    }

    // 2. Owner
    if (rfx.ownerId === user.id) {
        return true;
    }

    // 3. Invited
    const isInvited = rfx.invites.some((invite) => invite.invitedUserId === user.id);
    if (isInvited) {
        return true;
    }

    return false;
}
