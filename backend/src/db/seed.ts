import { db } from './index.js';
import { inspections } from './schema.js';

async function main() {
    console.log("Starting database seeding...");

    const existingData = await db.select().from(inspections).limit(1);
    if (existingData.length > 0) {
        console.log("Database already seeded. Skipping...");
        return;
    }

    const mockHistories = [
    {
        "id": "e07f66da-3744-47a3-8ae2-1b2fa7ed0d95",
        "name": "Test12",
        "standardName": "มาตรฐานข้าวชั้น 1",
        "standardId": "1",
        "note": "Test 12",
        "price": 32000,
        "samplingPoints": [
            "Front End",
            "Other"
        ],
        "samplingDate": "2026-03-21T16:29:00.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 42.4
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 57.54
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.06
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T16:29:58.381Z",
        "updatedAt": "2026-03-21T17:18:06.676Z"
    },
    {
        "id": "034aae0c-417d-4997-921c-5e11c2681305",
        "name": "Test11",
        "standardName": "มาตรฐานข้าวชั้น 2",
        "standardId": "2",
        "note": "Test 11",
        "price": 23000,
        "samplingPoints": [
            "Back End",
            "Other"
        ],
        "samplingDate": "2026-03-21T15:24:45.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 88.39
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 11.12
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.48
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:24:46.852Z",
        "updatedAt": "2026-03-21T15:24:46.852Z"
    },
    {
        "id": "f2874352-e527-4e46-8041-9cec02396b7b",
        "name": "Test10",
        "standardName": "มาตรฐานข้าวชั้น 2",
        "standardId": "2",
        "note": "Test 10",
        "price": 24000,
        "samplingPoints": [
            "Front End",
            "Back End"
        ],
        "samplingDate": "2026-03-21T15:24:23.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 88.39
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 11.12
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.48
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:24:24.868Z",
        "updatedAt": "2026-03-21T15:24:24.868Z"
    },
    {
        "id": "e238f96b-43d1-4d10-b070-4102e035da8b",
        "name": "Test9",
        "standardName": "มาตรฐานข้าวชั้น 2",
        "standardId": "2",
        "note": "Test9",
        "price": 25000,
        "samplingPoints": [
            "Other"
        ],
        "samplingDate": null,
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 88.39
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 11.12
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.48
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:24:05.126Z",
        "updatedAt": "2026-03-21T15:24:05.126Z"
    },
    {
        "id": "4f0a3ffe-2ed9-461f-a210-f24289f14645",
        "name": "Test8",
        "standardName": "มาตรฐานข้าวชั้น 1",
        "standardId": "1",
        "note": "",
        "price": 25000,
        "samplingPoints": [
            "Back End",
            "Other"
        ],
        "samplingDate": "2026-03-21T15:23:49.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 42.4
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 57.54
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.06
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:23:50.523Z",
        "updatedAt": "2026-03-21T15:23:50.523Z"
    },
    {
        "id": "0abe62b9-f4f6-48fa-b839-d8a9b1df8aba",
        "name": "Test7",
        "standardName": "มาตรฐานข้าวชั้น 1",
        "standardId": "1",
        "note": "",
        "price": 32000,
        "samplingPoints": [
            "Back End",
            "Other"
        ],
        "samplingDate": "2026-03-21T15:23:20.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 42.4
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 57.54
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.06
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:23:30.973Z",
        "updatedAt": "2026-03-21T15:23:30.973Z"
    },
    {
        "id": "72e9c67e-b0b2-4c05-ae91-73c6742fd968",
        "name": "Test6",
        "standardName": "มาตรฐานข้าวชั้น 1",
        "standardId": "1",
        "note": "Test 6",
        "price": 28000,
        "samplingPoints": [
            "Front End"
        ],
        "samplingDate": "2026-03-21T15:22:59.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 42.4
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 57.54
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.06
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:23:05.179Z",
        "updatedAt": "2026-03-21T15:23:05.179Z"
    },
    {
        "id": "c2442fd6-c142-4de4-a6ef-e148f8141214",
        "name": "Test5",
        "standardName": "มาตรฐานข้าวชั้น 2",
        "standardId": "2",
        "note": "",
        "price": 25000,
        "samplingPoints": [
            "Back End"
        ],
        "samplingDate": "2026-03-21T15:22:41.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 88.39
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 11.12
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.48
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:22:42.820Z",
        "updatedAt": "2026-03-21T15:22:42.820Z"
    },
    {
        "id": "8ad30009-8efa-4504-8776-84af845ddd0e",
        "name": "Test3",
        "standardName": "มาตรฐานข้าวชั้น 1",
        "standardId": "1",
        "note": "Test3",
        "price": 23000,
        "samplingPoints": [
            "Front End",
            "Back End"
        ],
        "samplingDate": null,
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 42.4
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 57.54
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.06
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:21:56.286Z",
        "updatedAt": "2026-03-21T15:21:56.286Z"
    },
    {
        "id": "7d7f8fe5-693f-405f-bde7-a65eccb2dfbe",
        "name": "Test2",
        "standardName": "มาตรฐานข้าวชั้น 2",
        "standardId": "2",
        "note": "",
        "price": 25000,
        "samplingPoints": [
            "Back End",
            "Front End"
        ],
        "samplingDate": "2026-03-21T15:17:05.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 88.39
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 11.12
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.48
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T15:17:07.510Z",
        "updatedAt": "2026-03-21T15:17:07.510Z"
    },
    {
        "id": "1b3c8ee7-194f-4a0a-99c8-452184a19177",
        "name": "Test1",
        "standardName": "มาตรฐานข้าวชั้น 1",
        "standardId": "1",
        "note": "Test 1st time",
        "price": 30000,
        "samplingPoints": [
            "Back End"
        ],
        "samplingDate": "2026-03-21T13:30:26.000Z",
        "totalSample": 1033,
        "compositionResult": [
            {
                "name": "ข้าวเต็มเมล็ด",
                "actual": 42.4
            },
            {
                "name": "ข้าวหักใหญ่",
                "actual": 57.54
            },
            {
                "name": "ข้าวหักทั่วไป",
                "actual": 0.06
            }
        ],
        "defectResult": [
            {
                "name": "ข้าวเหลือง",
                "actual": 1.72
            },
            {
                "name": "ข้าวท้องไข่",
                "actual": 46.09
            },
            {
                "name": "ข้าวเปลือก",
                "actual": 0
            },
            {
                "name": "ข้าวแดง",
                "actual": 0
            },
            {
                "name": "ข้าวเสีย",
                "actual": 0
            },
            {
                "name": "ข้าวเหนียว",
                "actual": 0.1
            },
            {
                "name": "ข้าวปลอมปนทั้งหมด",
                "actual": 48.39
            }
        ],
        "imageURL": "https://easyrice-es-trade-data.s3.ap-southeast-1.amazonaws.com/example-rice.webp",
        "createdAt": "2026-03-21T13:30:28.257Z",
        "updatedAt": "2026-03-21T13:30:28.257Z"
    }
    ];

    const formattedData = mockHistories.map(item => ({
        ...item,
        samplingDate: item.samplingDate ? new Date(item.samplingDate) : null,
        createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
        updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
    }));

    try {
        await db.insert(inspections).values(formattedData);
        console.log("Seeding completed successfully!");
    } catch (error) {
        console.error("Seeding failed:", error);
    }
    
    process.exit(0);
}

main();