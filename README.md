# Transport.ly

The app consists of two parts - "backend" and frontend. I tried to simulate the time restrictions, so I had to take some liberties in order to achieve this.

To start both parts simultaneously just use `npm run dev` and open `http://localhost:5173` in your browser.

## Brief overview

### Frontend

Clientside part of this app was written using React + Typescript. I used Vite to scaffold the project and cut some bootstrapping time. Since the task description explicitly says that it can be completed with any framework/lib, I decided to go with React, as I've been mainly working with Angular for the last 2 years and wanted to refresh some hands-on knowledge, so sorry if some bad practice used somewhere :)

I wasn't sure if there are any restrictions on WHERE the business logic should be done (orders to flight mapping), so I decided to do it on BE [as it's more logical] and keeps the client 'thin', so it's pretty much responsible solely for data fetching and rendering. I didn't use anything for applicateion state management, ALTHOUGH I used `react-query` to manage the BE requests easier, cache requests if possible etc.

For UI I used mainly `React Material UI`, which, honestly, looks the closest to the design on task screenshots.

I included some unit tests for only a single component (`ScheduledFlightsTable`) to include it as a practice, but again again, I wanted to try follow the time restrictions, so I wasn't able to cover most of the stuff. For the testing I used `react-testing-library`, which has been a de-facto standard ever since `Enzyme` has been deprecated.

Besides that I also minimally added config to lint, so it would sort `imports` in files.

### Backend

The goal of the BE in this case is to simply emulate the behaviour of real API, so the frontend could perform real data fetching requests
I was trying to keep it as simple as possible, so I just used plain Express.js for this purpose.

There's a lot of ways to optimize and enhance it, but I tried to take the simpliest approach and just perform flight-assigning algo on every server startup.

## TODOs

1. Add lint rule, so files in the `components` folder wouldn't be able to import anything out of it [it should be self-sufficient]
2. Increate unit tests coverage, add integration tests etc
3. Add tests for BE
4. "Optimize" BE by adding a DB ¯\_(ツ)\_/¯. Honestly, even something simple like SQLite would make most of the implemented business logic obsolete
5. Add Error handling (by using ErrorBoundary etc)
6. Support responsive design practices
