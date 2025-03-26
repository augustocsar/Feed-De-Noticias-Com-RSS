// src/aws/s3Service.js
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Log para debug
console.log('Configurações AWS:', {
    region: process.env.AWS_REGION,
    bucket: process.env.S3_BUCKET
});

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
});

export const uploadToS3 = async (data) => {
    try {
        if (!process.env.S3_BUCKET) {
            throw new Error('S3_BUCKET não está definido nas variáveis de ambiente');
        }

        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `g1-news-${Date.now()}.json`,
            Body: JSON.stringify(data),
            ContentType: 'application/json'
        };

        console.log('Tentando fazer upload para o bucket:', process.env.S3_BUCKET);
        const result = await s3.upload(params).promise();
        console.log('Dados salvos no S3:', result.Location);
        return result.Location;
    } catch (error) {
        console.error('Erro ao salvar no S3:', error);
        throw error;
    }
};