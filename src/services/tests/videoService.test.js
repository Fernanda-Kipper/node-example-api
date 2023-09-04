import { jest } from '@jest/globals'

import videoService from "../videoService";

const mockLow = jest.fn();
const mockJSONFile = jest.fn().mockImplementation(() => ({}));

// jest.mock('lowdb', () => ({
//     Low: mockLow,
//     JSONFile: mockJSONFile,
// }))

describe("VideoService", () => {
    describe("validateVideoFields",() => {
        test("should not thrown error when fields are valid", () => {
            let title = "testTitle";
            let description = "testDescription";
            let url = "http://google.com"
    
            let result = videoService.validateVideoFields(title, description, url);
    
            expect(result).toBeUndefined();
        })
    
        test("should thrown error when fields are invalid", () => {
            let title = "testTitle";
            let description = "testDescription";
            let url = null;
    
            let result = () => videoService.validateVideoFields(title, description, url);
    
            expect(result).toThrow(new Error('Por favor, forneça todos os campos necessários.'));
        })
    })

    it("GenerateId: should return id", () => {
        let result = videoService.generateId();
        expect(result).toBeDefined();
    })

    it("getAllVideos: should get all videos", async () => {
        const db = {
            read: () => {},
            data: {
                videos: []
            }
        }

        const result = await videoService.getAllVideos(db);

        expect(result).toStrictEqual([])
    })
    
    // it("initiateDatabase: should start db instance with right parameters", () => {
    //     const result = videoService.initiateDatabase();

    //     expect(mockJSONFile).toHaveBeenCalled();
    //     expect(mockLow).toHaveBeenCalledWith({}, { videos: [] })
    // })
})