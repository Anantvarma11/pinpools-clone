-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cas_number" TEXT NOT NULL,
    "ec_number" TEXT,
    "iupac_name" TEXT NOT NULL,
    "synonyms" TEXT NOT NULL,
    "purity_percentage" REAL NOT NULL,
    "grade" TEXT NOT NULL,
    "sustainability_rating" INTEGER NOT NULL,
    "description" TEXT,
    "moq" REAL,
    "priceHint" DECIMAL,
    "companyId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tender" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyer_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "line_items" JSONB NOT NULL,
    "incoterms" TEXT NOT NULL DEFAULT 'DDP',
    "delivery_date" DATETIME,
    "region" TEXT,
    "invited_suppliers" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tender_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Market_Data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cas_number" TEXT NOT NULL,
    "transaction_date" DATETIME NOT NULL,
    "unit_price" DECIMAL NOT NULL,
    "currency" TEXT NOT NULL,
    "volume" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RFX" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RFX_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RFX_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BidVersion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rfxId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "termsJson" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "txHash" TEXT,
    "saltHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BidVersion_rfxId_fkey" FOREIGN KEY ("rfxId") REFERENCES "RFX" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BidVersion_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RFXInvite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rfxId" TEXT NOT NULL,
    "invitedUserId" TEXT NOT NULL,
    CONSTRAINT "RFXInvite_rfxId_fkey" FOREIGN KEY ("rfxId") REFERENCES "RFX" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RFXInvite_invitedUserId_fkey" FOREIGN KEY ("invitedUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_cas_number_grade_key" ON "Product"("cas_number", "grade");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
