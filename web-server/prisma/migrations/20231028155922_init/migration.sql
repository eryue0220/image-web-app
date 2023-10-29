-- CreateTable
CREATE TABLE "Image" (
    "jobId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "img" BYTEA NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("jobId")
);
