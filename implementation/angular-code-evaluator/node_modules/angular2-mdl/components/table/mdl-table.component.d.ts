import { EventEmitter } from '@angular/core';
export interface IMdlTableColumn {
    key: string;
    name: string;
    sortable?: boolean;
    numeric?: boolean;
}
export interface IMdlTableModelItem {
    selected: boolean;
}
export interface IMdlTableModel {
    columns: [IMdlTableColumn];
    data: Array<IMdlTableModelItem>;
}
export declare class MdlDefaultTableModel implements IMdlTableModel {
    columns: [IMdlTableColumn];
    data: Array<IMdlTableModelItem>;
    constructor(columns: [IMdlTableColumn]);
    addAll(data: [IMdlTableModelItem]): void;
}
export declare class MdlTableComponent {
    model: IMdlTableModel;
    protected selectable: boolean;
}
export declare class MdlSelectableTableComponent extends MdlTableComponent {
    model: IMdlTableModel;
    selected: Array<IMdlTableModelItem>;
    selectionChange: EventEmitter<{}>;
    protected selectable: boolean;
    protected allSelected: boolean;
    isAllSelected(): boolean;
    protected toogleAll(): void;
    private updateSelected();
    protected selectionChanged(data: any): void;
}
