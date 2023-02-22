import { BigInt } from "@graphprotocol/graph-ts"
import {
  ColdStaking as Contract,
  NewStake,
  OwnershipTransferred,
  StakePaid
} from "../generated/ColdStaking/ColdStaking"
import { Stake,Staker } from "../generated/schema"

export function handleNewStake(event: NewStake): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let stake = Stake.load(event.params.stakeId.toHex())
  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!stake) {
    stake = new Stake(event.params.stakeId.toHex())
  }
  let contract = Contract.bind(event.address);
  let structStake = contract.stakes(event.params.stakeId)


  // stake fields can be set based on event parameters
  stake.stakeId = event.params.stakeId
  stake.stakerAddress = event.params.stakerAddress

  stake.amountStaked = structStake.getAmountStaked()
  stake.finalReward = structStake.getFinalReward()
  stake.deadline = structStake.getDeadline()
  stake.payed = false;
  // Entities can be written to the store with `.save()`
  stake.save()

  let staker = Staker.load(event.params.stakerAddress.toHex());

  if(!staker){
    staker = new Staker(event.params.stakerAddress.toHex())
    staker.total = new BigInt(0);
    staker.totalStaked = new BigInt(0);
    staker.totalPayed = new BigInt(0);
  }

  staker.address = event.params.stakerAddress;
  staker.total = staker.total + stake.amountStaked;
  staker.totalStaked = staker.totalStaked + stake.amountStaked;
  //let stakes = staker.stakes;
  //stakes.push(stake);
  //staker.stakes = stakes;
  staker.save();
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

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleStakePaid(event: StakePaid): void {
  let stake = Stake.load(event.params.stakeId.toHex())
  if(!stake){
    return
  }
  stake.payed = true;
  let contract = Contract.bind(event.address);

  let staker = Staker.load(event.params.stakerAddress.toHex());

  if(!staker){
    staker = new Staker(event.params.stakerAddress.toHex())
  }

  staker.address = event.params.stakerAddress;
  staker.totalStaked = staker.totalStaked - stake.amountStaked;
  staker.totalPayed = staker.totalPayed + stake.amountStaked
  staker.save();

}
