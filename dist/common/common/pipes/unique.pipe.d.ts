import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class UniqueFieldPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
