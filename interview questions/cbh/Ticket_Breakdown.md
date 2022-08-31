# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### High-level assumptions

#### Deployment environments

1. Developers have their own local machines that run the local databases.
2. Work comes together in a `dev` environment.
3. Before released to `production`, the `staging` environment is updated.

#### API pseudocode

```ts
function buildReportHandler(id, res) {
  const shifts = getShiftsByFacility(id);
  const report = generateReport(shifts);
  res.send(report);
}
```

---

### Ticket 1 - Product Discovery: Custom Facility ID Validation

#### Problem Statement

The customer requested 'the ability for Facilities to save their own custom ids'. This is a little ambiguous. A couple of clarifying answers are needed:

- Is there a specific format we should expect and verify?
- Are we expecting the customer to add in multiple ids for each facility?
- Is there a need for a front end for the customer to assign the facility a new ID? Or is this handled internally via request and manual db update?
- Will the custom ID be changeable once saved?
- Will the report need to list the internal ID and the custom ID, if they differ?

#### Time/Effort Estimation

This would likely be a question asked when the request first came in, and would likely be a simple 2 minute conversation. This is a Product Discovery ticket, so a larger ask could take a day or two.

My assumed answers:

- Is there a specific format we should expect and verify?
  - No, only a max of 50 characters for readability
- Are we expecting the customer to add in multiple ids for each facility?
  - No
- Is there a need for a front end for the customer to assign the facility a new ID? Or is this handled internally via request and manual db update?
  - No
- Will the custom ID be changeable once saved?
  - Yes
- Will the report need to list the internal ID and the custom ID, if they differ?
  - Yes. The current internal ID that is prominent on the report is replaced with the custom ID. The internal ID is added to the report in the page footers of the PDF.

#### Acceptance Criteria

All questions are answered by Product. If product does not have an answer at this time, this might block other stories.

---

### Ticket 2 - Add custom id field to Facility table

#### Problem Statement

The customer would like a custom ID for the Facility when a report is generated. To that end, the Facility table needs to be updated to allow for a new custom field.

The internal ID will be used for all db join statements and for any APIs. This new field is for informational and reporting purposes only.

#### Goals

- Create a db table migration to support the new field

  - Add `customId` to the Facility table: `VARCHAR(50)`
  - For every current facility, copy the internal `id` as `UUID` to the new field as default.

- Create down migration plan

  - Remove the new field from the table.

#### Time/Effort Estimation

| Task                                          | Estimate   |
| --------------------------------------------- | ---------- |
| Initial work and `dev` environment validation | half a day |
| Integration into the `staging` environemnt    | half a day |

#### Acceptance Criteria

- Sufficient unit tests to validate that the table modification has passed

---

### Ticket 3 - Add custom id field to db query

#### Problem Statement

Current functions that make calls to the database need to pull the new `customId` field.

For this exercise, the only function we have is `getShiftsByFacility()`, which assumes the `Facility` table is being linked to the `Shift` table. Any additional customer-facing UI or report would need a similar effort to display the new field. Though, I would likely have pulled the facility itself in the api call first, avoiding the need for a joined table.

#### Goals

- Add the `customId` field to the existing query.
- Add unit tests with mock functions to verify that pulling the db records can give different values for `customId` than `id`.

#### Time/Effort Estimation

| Task                | Estimate   |
| ------------------- | ---------- |
| Modify the db query | 5 miuntes  |
| Unit Tests          | half a day |

#### Acceptance Criteria

- Unit tests sufficiently cover the new field and pass.

### Ticket 4 - Modify the PDF

#### Problem Statement

Given the update PDF requirements, modify the PDF output accordingly.

#### Goals

- Replace instances of displaying `id` with `customId` value.
- Ensure a good plan is in place for text wrapping.
- Unit tests might be optional. Validation of the update field display could be a manual validation.

#### Time/Effort Estimation

| Task           | Estimate |
| -------------- | -------- |
| Modify the PDF | 2 hours  |

#### Acceptance Criteria

- PDF displays as desired.
