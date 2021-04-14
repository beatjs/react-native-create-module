export declare const command: {
    name: string;
    description: string;
    usage: string;
    func: (args: any, options: any) => void;
    options: ({
        command: string;
        description: string;
        default: string;
    } | {
        command: string;
        description: string;
        default?: undefined;
    })[];
};
