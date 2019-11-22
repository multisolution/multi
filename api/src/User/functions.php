<?php declare(strict_types=1);

namespace Multi\User;

use GraphQL\Error\UserError;
use Multi\Context;
use Multi\User\Role\Permission\Permission;
use Multi\User\Role\Permission\Permits;

function is_authenticated(Context $context): bool
{
    return $context->user !== null;
}

function assert_authenticated(Context $context)
{
    if (!is_authenticated($context)) {
        throw new UserError('Unauthenticated', 401);
    }
}

function permits(User $user, Permission $permission): bool
{
    $permits = new Permits($user);
    return $permits($permission);

}

function assert_authorized(Context $context, Permission $permission)
{
    assert_authenticated($context);

    if (!permits($context->user, $permission)) {
        throw new UserError('Unauthorized', 403);
    }
}
