import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventoryAdd'
})
export class InventoryAddPipe implements PipeTransform {

  transform(value: any): any {
    var data = [];
    // let loginData = JSON.parse(sessionStorage.getItem('userSession'));
    console.log(value.length)
    console.log(value.vechile_details);
    value.vechile_details = JSON.parse(value.vechile_details);
    // for (let j = 0; j < value.vechile_details.length; j++) {
    //   data.push({
    //     indent_id: value.indent_id,
    //     branch_id: value.branch_id,
    //     shipped_by: value.shipped_by,
    //     generated_shipping_id: value.generated_shipping_id,
    //     assign_qty: value.assign_qty,
    //     vechile_no: value.vechile_no,
    //     br_mgr_ack: value.br_mgr_ack,
    //     br_mgr_comment: value.br_mgr_comment,
    //     status: value.status,
    //     chassis_number: value.vechile_details[j].chassisno,
    //     color: value.vechile_details[j].color,
    //     engineno: value.vechile_details[j].engineno,
    //     frameno: value.vechile_details[j].frameno,
    //     make: value.vechile_details[j].make,
    //     model: value.vechile_details[j].model
    //   });
    // }

    for (let j = 0; j < value.vechile_details.length; j++) {
      data.push({
        indent_id: value.indent_id,
        branch_id: value.employee_branch_id,
        shipped_by: value.shipped_by,
        shipped_vechile_no: value.shipped_vechile_no,
        generated_shipping_id:value.generated_shipping_id,
        assign_qty: value.assign_qty,
        vechile_no: value.vechile_no,
        br_mgr_ack: value.br_mgr_ack,
        br_mgr_comment: value.br_mgr_comment,
        status: value.status,
        chassis_number: value.vechile_details[j].chassisno,
        color: value.vechile_details[j].color,
        engineno: value.vechile_details[j].engineno,
        frameno: value.vechile_details[j].frameno,
        variant: value.vechile_details[j].variant,
        model: value.vechile_details[j].model
      });
    }
    console.log(data);
    return data;
  }

}
