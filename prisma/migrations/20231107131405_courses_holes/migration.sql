-- CreateTable
CREATE TABLE "GolfCourse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "distanceInYards" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "numHoles" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GolfCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GolfHole" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "golfCourseId" INTEGER,
    "description" TEXT,
    "HoleNumber" INTEGER NOT NULL,
    "par" INTEGER NOT NULL,
    "distanceInYards" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GolfHole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GolfHole" ADD CONSTRAINT "GolfHole_golfCourseId_fkey" FOREIGN KEY ("golfCourseId") REFERENCES "GolfCourse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
