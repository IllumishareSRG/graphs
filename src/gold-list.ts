import { BigInt } from "@graphprotocol/graph-ts"
import {
  GoldList as Contract,
  AddedStableCoin,
  RemovedStableCoin
} from "../generated/GoldList/GoldList"
import { Stablecoin } from "../generated/schema"

export function handleStableCoinAdded(event: AddedStableCoin): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let stablecoin = Stablecoin.load(event.params.stableCoinAddress.toHex())
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!stablecoin) {
    stablecoin = new Stablecoin(event.params.stableCoinAddress.toHex())
  }
  stablecoin.accepted = true;
  stablecoin.save();
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the stake from the store. Instead, create it fresh with
  // `new stake(...)`, set the fields that should be updated and save the
  // stake back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.balanceOf(...)
  // - contract.owner(...)
  // - contract.srgToken(...)
  // - contract.stakeCounter(...)
  // - contract.stakedBalance(...)
  // - contract.stakes(...)
}

export function handleStableCoinRemoved(event: RemovedStableCoin): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let stablecoin = Stablecoin.load(event.params.stableCoinAddress.toHex())
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (stablecoin) {
    stablecoin.accepted = false;
    stablecoin.save();
  }
}
