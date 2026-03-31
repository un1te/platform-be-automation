import { getAxiosInstance } from "../helpers/utils/axiosInstance";
import { Response, CompanyParams } from "./Interfaces/companies";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS, VALIDATION_RULES, ERROR_MESSAGES } from '../helpers/constants';

/**
 * CompaniesApi class handles all company-related API operations
 * Provides methods for retrieving companies and featured companies
 */
export default class CompaniesApi {

    /**
     * Retrieves companies with optional filtering parameters
     * @param params - Query parameters for filtering companies
     * @returns Company data or array of companies
     * @throws Error if API request fails
     */
    public async getCompanies(params: CompanyParams): Promise<Response> {
        try {
            this.validateParams(params);

            const axiosInstance = await getAxiosInstance();
            const filteredParams = Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
                .join('&');

            const queryString = filteredParams ? `?${filteredParams}` : '';
            const response = await axiosInstance.get(`${API_ENDPOINTS.COMPANIES}${queryString}`);

            if (!response.data) {
                throw new Error('Invalid response format: empty company data');
            }

            return response.data;
        } catch (error) {
            this.handleError('Failed to retrieve companies', error);
            throw error;
        }
    }

    /**
     * Retrieves featured companies for a specific meeting
     * @param meetingId - Meeting ID to get featured companies for
     * @returns Array of featured companies
     * @throws Error if meeting ID is invalid or API request fails
     */
    public async getFeaturedCompanies(meetingId: number): Promise<Response[]> {
        try {
            if (!meetingId || meetingId < VALIDATION_RULES.MIN_ID) {
                throw new Error(`${ERROR_MESSAGES.INVALID_DATA}: Meeting ID must be a positive number`);
            }

            const axiosInstance = await getAxiosInstance();
            const response = await axiosInstance.get(`${API_ENDPOINTS.FEATURED_COMPANIES}?meetingId=${meetingId}`);

            if (!Array.isArray(response.data)) {
                throw new Error('Invalid response format: expected companies array');
            }

            return response.data;
        } catch (error) {
            this.handleError(`Failed to retrieve featured companies for meeting ${meetingId}`, error);
            throw error;
        }
    }

    /**
     * Validates company query parameters
     * @param params - Parameters to validate
     * @throws Error if any parameter is invalid
     */
    private validateParams(params: CompanyParams): void {
        if (params.page && isNaN(Number(params.page))) {
            throw new Error(`${ERROR_MESSAGES.INVALID_DATA}: Page must be a valid number`);
        }
        if (params.limit && isNaN(Number(params.limit))) {
            throw new Error(`${ERROR_MESSAGES.INVALID_DATA}: Limit must be a valid number`);
        }
    }

    /**
     * Handles and logs API errors in a standardized way
     * @param context - Context description for the error
     * @param error - The error object
     */
    private handleError(context: string, error: any): void {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error(`${context}:`, {
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                message: axiosError.message,
                data: axiosError.response?.data,
            });
        } else if (error instanceof Error) {
            console.error(`${context}: ${error.message}`);
        } else {
            console.error(`${context}:`, error);
        }
    }
}