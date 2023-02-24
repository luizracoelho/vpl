﻿namespace PriceListsService.Domain.Contracts
{
    public interface IBaseDomain
    {
        long Id { get; }

        bool Validate();
    }
}
