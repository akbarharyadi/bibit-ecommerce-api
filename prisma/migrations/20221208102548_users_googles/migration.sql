-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "salt" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "federated_credentials" (
    "id" SERIAL NOT NULL,
    "provider" VARCHAR(255),
    "subject" VARCHAR(255),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "federated_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "federated_credentials_user_id_key" ON "federated_credentials"("user_id");

-- AddForeignKey
ALTER TABLE "federated_credentials" ADD CONSTRAINT "federated_credentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
