import {PutObjectCommand, S3Client, DeleteObjectCommand} from "@aws-sdk/client-s3"
import {configs} from "../configs/config";
import {UploadedFile} from "express-fileupload";
import {randomUUID} from "crypto"
import path from "node:path";


class S3Service {
    constructor(
        private readonly s3Client = new S3Client({
            forcePathStyle: true,
            region: configs.AWS_REGION,
            credentials: {
                accessKeyId: configs.AWS_ACCESS_KEY,
                secretAccessKey: configs.AWS_SECRET_ACCESS_KEY
            },
        }),
    ) {
    }

    public async uploadFile(ItemType: "customer", itemId: string, file: UploadedFile): Promise<string> {
        const filePath = `${ItemType}/${itemId}/${randomUUID()}${path.extname(file.name)}`
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: configs.AWC_BUCKET_NAME,
                Key: filePath,
                Body: file.data,
                ACL: configs.AWS_S3_ACL,
                ContentType: file.mimetype
            })
        )
        return filePath
    }

    public async deleteFile(pathToFile: string) {
        await this.s3Client.send(
            new DeleteObjectCommand({
                Bucket: configs.AWC_BUCKET_NAME,
                Key: pathToFile
            })
        )
    }
}

export const s3Service = new S3Service()