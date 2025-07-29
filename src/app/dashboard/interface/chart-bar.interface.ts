export interface ChartBarData {
    labels: string[];
    datasets?: {
        label: string;
        backgroundColor: string[];
        borderColor: string[];
        data: number[];
    }[];
}