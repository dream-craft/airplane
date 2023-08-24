# airplane backend

## Development Environment

### Database

1. Run `pnpm run start:db:local` from root directory

2. Create `.env` file in backend directory and add the following

    ```shell
    DATABASE_URL="postgresql://airplane:airplane@127.0.0.1:3200/airplane?schema=public"
    ```

3. Run `pnpm run db:migrate:dev` from backend directory to create tables

4. Run `pnpm run db:seed` from backend directory to seed tables

### Server

1. Run `pnpm run dev` from backend directory
