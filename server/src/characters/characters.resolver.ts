import {Resolver, Query, Args, Context} from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/auth/auth.guard';

import { CharactersService } from '@/characters/characters.service';
import { CharactersType } from '@/characters/characters.type';
import {AccountDecorator} from '@/account/account.decorator';

@Resolver(() => CharactersType)
export class CharactersResolver
{
    constructor(private charactersService: CharactersService)
    {}

    @Query(() => CharactersType)
    public async getArenaTeamByType(@Args('realm') realm: string, @Args('type') type: number, @Args('page') page: number, @Args('limit') limit: number)
    {
        return this.charactersService.getArenaTeamByType(realm, type, page, limit);
    }

    @Query(() => CharactersType)
    public async getArenaTeamById(@Args('realm') realm: string, @Args('id') id: number, @Args('page') page: number, @Args('limit') limit: number)
    {
        return this.charactersService.getArenaTeamById(realm, id, page, limit);
    }

    @Query(() => CharactersType)
    public async getArenaTeamMember(@Args('realm') realm: string, @Args('id') id: number, @Args('page') page: number, @Args('limit') limit: number)
    {
        return this.charactersService.getArenaTeamMember(realm, id, page, limit);
    }

    @Query(() => CharactersType)
    public async getTopKillers(@Args('realm') realm: string, @Args('page') page: number, @Args('limit') limit: number)
    {
        return this.charactersService.getTopKillers(realm, page, limit);
    }

    @Query(() => CharactersType)
    public async getTopAchievements(@Args('realm') realm: string, @Args('page') page: number, @Args('limit') limit: number)
    {
        return this.charactersService.getTopAchievements(realm, page, limit);
    }

    @Query(() => CharactersType)
    public async getTopPlayedTime(@Args('realm') realm: string, @Args('page') page: number, @Args('limit') limit: number)
    {
        return this.charactersService.getTopPlayedTime(realm, page, limit);
    }

    @Query(() => CharactersType)
    @UseGuards(AuthGuard)
    public async rename(@Args('realm') realm: string, @AccountDecorator() accountID: number, @Args('guid') guid: number, @Context() ctx)
    {
        return this.charactersService.rename(realm, accountID, guid, ctx.res);
    }

    @Query(() => CharactersType)
    @UseGuards(AuthGuard)
    public async customize(@Args('realm') realm: string, @AccountDecorator() accountID: number, @Args('guid') guid: number, @Context() ctx)
    {
        return this.charactersService.customize(realm, accountID, guid, ctx.res);
    }

    @Query(() => CharactersType)
    @UseGuards(AuthGuard)
    public async changeFaction(@Args('realm') realm: string, @AccountDecorator() accountID: number, @Args('guid') guid: number, @Context() ctx)
    {
        return this.charactersService.changeFaction(realm, accountID, guid, ctx.res);
    }

    @Query(() => CharactersType)
    @UseGuards(AuthGuard)
    public async changeRace(@Args('realm') realm: string, @AccountDecorator() accountID: number, @Args('guid') guid: number, @Context() ctx)
    {
        return this.charactersService.changeRace(realm, accountID, guid, ctx.res);
    }

    @Query(() => CharactersType)
    @UseGuards(AuthGuard)
    public async unstuck(@Args('realm') realm: string, @AccountDecorator() accountID: number, @Args('guid') guid: number, @Context() ctx)
    {
        return this.charactersService.unstuck(realm, accountID, guid, ctx.res);
    }
}
