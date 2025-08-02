export interface ChartBarData {
    labels: string[];
    datasets?: {
        label: string;
        fill?: false,
        backgroundColor: string[];
        borderColor: string[];
        yAxisID?: string;
        tension?: number;
        data: number[];
    }[];
}