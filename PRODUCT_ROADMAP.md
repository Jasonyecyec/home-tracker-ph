# Home Tracker PH Product Roadmap

## Product Direction

Home Tracker PH should evolve from basic property CRUD into a personal
home-search decision system.

The goal is to help a renter or buyer in the Philippines answer:

- Which properties are worth contacting?
- Which properties are worth visiting?
- Which properties are still realistic after full move-in costs?
- Which property is the strongest option after comparing tradeoffs?

## Current Product State

The product currently supports the core tracking flow:

- Authentication and protected dashboard access
- Dashboard statistics for tracked properties
- Property listing CRUD foundation
- Property cards with image, link, location, type, rent or price, contact, and notes
- Image upload for listings
- Simple status tracking: pending, reviewed, rejected
- Status filtering on the property list

This is a solid base, but the product is still mostly a listing tracker. The
next step is to help with decision-making.

## Highest-Value Features

### Property Scoring

Help the user rank listings beyond price alone.

Suggested scoring fields:

- Budget fit
- Commute fit
- Safety or neighborhood confidence
- Space and layout fit
- Contact or landlord responsiveness
- Overall rating

### Richer Search Workflow

Replace vague statuses with a workflow that matches the real house-hunting
process.

Current statuses:

- Pending
- Reviewed
- Rejected

Recommended statuses:

- Saved
- Contacted
- Viewing scheduled
- Viewed
- Shortlisted
- Rejected

Status meanings:

- Saved: The listing was captured, but no action has been taken yet.
- Contacted: The owner, agent, or landlord has been messaged or called.
- Viewing scheduled: A visit or inspection has a planned date and time.
- Viewed: The property has already been visited or inspected.
- Shortlisted: The property is still a strong candidate.
- Rejected: The property is no longer a fit.

Recommended data values:

- saved
- contacted
- viewing_scheduled
- viewed
- shortlisted
- rejected

Suggested replacement:

- Replace pending with saved.
- Replace reviewed with viewed or shortlisted, depending on context.
- Keep rejected.

This makes it easier to know what action is needed next.

### Viewing Scheduler

Help the user manage property visits.

Suggested fields:

- Viewing date and time
- Contact person
- Meeting location
- Visit notes
- Follow-up action

### Cost Breakdown

Show the real affordability of each property, not just the monthly rent or sale
price.

Suggested fields:

- Monthly rent or sale price
- Deposit
- Advance payment
- Association dues
- Parking fee
- Estimated utilities
- Estimated move-in total

This is especially useful for PH rentals where move-in costs can vary widely.

### Comparison View

Let the user compare shortlisted properties side by side.

Recommended comparison fields:

- Price and move-in total
- Location
- Commute notes
- Property type
- Contact status
- Pros and cons
- Red flags
- Overall score

## PH-Specific Features

### Commute and Location Notes

Support local decision factors that matter in the Philippines.

Suggested fields:

- Nearest MRT, LRT, bus, jeepney, or tricycle access
- Estimated commute time to work or school
- Nearby groceries, malls, hospitals, and pharmacies
- Internet provider availability
- Parking availability

### Flood and Safety Checks

Help the user avoid location risks.

Suggested fields:

- Flood-prone area notes
- Street lighting and safety notes
- Building security
- Water pressure concerns
- Mobile signal quality

### Red Flag Checklist

Make it easier to reject risky listings quickly.

Suggested checklist items:

- No clear owner or agent identity
- No written contract
- Suspicious payment terms
- Unclear move-in fees
- Poor building maintenance
- Flood risk
- Poor internet or mobile signal
- Bad water pressure
- Excessive noise

### Pros, Cons, and Dealbreakers

Make property notes more structured and easier to compare.

Suggested fields:

- Pros
- Cons
- Dealbreakers
- Questions to ask

## Medium-Priority Improvements

### Search and Advanced Filters

Help users find relevant saved listings faster.

Useful filters:

- City or area
- Maximum budget
- Property type
- Workflow status
- Score
- Viewing scheduled
- Rent or buy

### Edit Property

Allow users to update details after contacting an owner, agent, or landlord.

This should include all existing listing fields plus future decision fields such
as viewing date, costs, scores, and notes.

### Duplicate URL Detection

Warn the user when adding a listing URL that already exists.

This prevents duplicate tracking when listings are saved from multiple sources
or revisited later.

### Archive Instead of Delete

Preserve decision history without cluttering active search results.

Archived listings can be hidden from the main board but still available for
reference.

## Recommended Roadmap

### Phase 1: Improve the Core Search Workflow

- Add full edit property support
- Replace current statuses with a richer search workflow
- Add viewing date and contact follow-up fields
- Add cost breakdown fields
- Add structured pros, cons, dealbreakers, and questions

### Phase 2: Turn Listings Into Decisions

- Add property scoring
- Add shortlist-focused views
- Add side-by-side comparison
- Add red flag checklist

### Phase 3: Make the Product Smarter

- Add duplicate URL detection
- Add map or location view
- Add reminders for scheduled viewings
- Add export or shareable shortlist
- Explore listing URL auto-extraction if reliable enough

## Suggested Next Feature

The best next feature is full property editing combined with richer workflow
statuses.

Reason:

- Property information naturally changes after contacting or visiting a listing.
- Richer statuses make the app immediately more useful for an active search.
- Future features like scoring, cost breakdown, and comparison depend on being
  able to update property details cleanly.
