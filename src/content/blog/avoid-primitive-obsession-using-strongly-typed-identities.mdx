---
title: 'Avoid primitive obsession using strongly-typed identities'
description: 'Create a more robust domain by avoiding obsession with primitive types. Stop using primitive types as entity identifiers. Learn how to create and use strongly-typed identities as entity identifiers instead.'
pubDate: 'Jun 13 2025'
tags:
  - 'Domain Driven Design'
  - 'C#'
  - 'Primitive obsession'
ttr: '9 min read'
published: true
---

We've all written code that uses primitive types such as `Guid`, `int`, or `string` as entity identifiers. This approach is simple and direct, and seems harmless. However, this common practice, known as **primitive obsession**, can silently introduce subtle bugs into your application.

This post will show you how to avoid primitive obsession by creating **strongly-typed identities**. By wrapping identifiers in dedicated value objects, you can leverage the compiler to prevent bugs, clarify your domain, and build more robust applications.

## A Bug Hiding in Plain Sight

Imagine a simple auction application where a `User` can place a `Bid` on an `Auction`. Your initial, straightforward domain models might look like this:

```csharp
public class Auction
{
    public Guid Id { get; set; }
    // ... other properties
}

public class Bid
{
    public Guid Id { get; set; }
    // ... other properties
}
```
And the service method to place a bid is defined as follows:
```csharp
public class AuctionService
{
    public void PlaceBid(Guid auctionId, Guid bidId)
    {
        // ... logic to associate a bid with an auction
        Console.WriteLine($"Placing bid {bidId} on auction {auctionId}");
    }
}
```
Now, look at how easily a bug can creep in when this service is called:
```csharp
public static void Main()
{
    var auction = new Auction { Id = Guid.NewGuid() };
    var bid = new Bid { Id = Guid.NewGuid() };
    var auctionService = new AuctionService();

    // Oops! The parameters are swapped.
    auctionService.PlaceBid(bid.Id, auction.Id);
}
```
The issue here is subtle. The parameters are swapped, but since both are `Guid`s and therefore interchangeable, the compiler allows it. This code compiles and runs but leads to incorrect behavior. In production, that kind of mistake could be costly.

## A Safer Approach: Strongly-Typed Identities

To avoid this, we can define specific types for each kind of identifier. A `readonly record struct` is ideal: it's lightweight, immutable, and enforces value-based equality.

Refactor the identifiers like this:
```csharp
public readonly record struct AuctionId(Guid Value);
public readonly record struct BidId(Guid Value);
```
Update your entities and service to use them:
```csharp
public class Auction
{
    public AuctionId Id { get; set; }
}

public class Bid
{
    public BidId Id { get; set; }
}

public class AuctionService
{
    public void PlaceBid(AuctionId auctionId, BidId bidId)
    {
        // ... logic to place a bid on an auction
    }
}
```
Now, let’s go back to the earlier mistake:
```csharp
public static void Main()
{
    var auction = new Auction { Id = new AuctionId(Guid.NewGuid()) };
    var bid = new Bid { Id = new BidId(Guid.NewGuid()) };
    var auctionService = new AuctionService();

    // This line won't compile:
    // auctionService.PlaceBid(bid.Id, auction.Id);

    // Correct usage:
    auctionService.PlaceBid(auction.Id, bid.Id);
}
```
With these changes, the compiler enforces the correct parameter order. A category of bug has been eliminated.
## Benefits Beyond Safety
Using strongly-typed identities offers more than just compile-time safety:

- **Type Safety**: Prevents passing identifiers of the wrong type by mistake.
- **Clarity**: Method signatures are more self-explanatory.
- **Expressive Code**: Identifiers carry domain meaning instead of being opaque primitives.
- **Easier Refactoring**: Changes are easier to track and validate through the type system.

## Final Thoughts

Switching from primitive identifiers to strongly-typed ones is a minor change with significant impact. It improves type safety, domain clarity, and overall maintainability. If you're building domain-oriented systems, this approach pays off quickly—especially in larger or more complex codebases.