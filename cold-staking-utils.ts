import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  NewStake,
  OwnershipTransferred,
  StakePaid
} from "../generated/ColdStaking/ColdStaking"

export function createNewStakeEvent(
  stakeId: BigInt,
  stakerAddress: Address,
  amountStaked: BigInt,
  deadline: BigInt
): NewStake {
  let newStakeEvent = changetype<NewStake>(newMockEvent())

  newStakeEvent.parameters = new Array()

  newStakeEvent.parameters.push(
    new ethereum.EventParam(
      "stakeId",
      ethereum.Value.fromUnsignedBigInt(stakeId)
    )
  )
  newStakeEvent.parameters.push(
    new ethereum.EventParam(
      "stakerAddress",
      ethereum.Value.fromAddress(stakerAddress)
    )
  )
  newStakeEvent.parameters.push(
    new ethereum.EventParam(
      "amountStaked",
      ethereum.Value.fromUnsignedBigInt(amountStaked)
    )
  )
  newStakeEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return newStakeEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createStakePaidEvent(
  stakeId: BigInt,
  stakerAddress: Address,
  amountStaked: BigInt,
  deadline: BigInt
): StakePaid {
  let stakePaidEvent = changetype<StakePaid>(newMockEvent())

  stakePaidEvent.parameters = new Array()

  stakePaidEvent.parameters.push(
    new ethereum.EventParam(
      "stakeId",
      ethereum.Value.fromUnsignedBigInt(stakeId)
    )
  )
  stakePaidEvent.parameters.push(
    new ethereum.EventParam(
      "stakerAddress",
      ethereum.Value.fromAddress(stakerAddress)
    )
  )
  stakePaidEvent.parameters.push(
    new ethereum.EventParam(
      "amountStaked",
      ethereum.Value.fromUnsignedBigInt(amountStaked)
    )
  )
  stakePaidEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return stakePaidEvent
}
