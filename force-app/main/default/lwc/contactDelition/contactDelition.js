import { LightningElement, wire , track} from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import TITLE_FIELD from '@salesforce/schema/Contact.Title'
import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import DEPARTMENT_FIELD from '@salesforce/schema/Contact.Department';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import contactDelition from '@salesforce/apex/ContactController.contactDelition';
const COLUMNS = [
    { label: 'FirstName', fieldName: FIRSTNAME_FIELD.fieldApiName, type: 'text' },
    // { label: 'LastName', fieldName: LASTNAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'text' },
    { label: 'Title', fieldName: TITLE_FIELD.fieldApiName, type: 'text' },
    // { label: 'Title', fieldName: TITLE_FIELD.fieldApiName, type: 'text' }
];
export default class ContactDelition extends LightningElement {
    columns = COLUMNS;
    @wire(getContacts)
    contacts;

clickedButtonLabel;
 
 

    
   
    

    getSelected(){
  
        let el = this.template.querySelector('lightning-datatable');
      
        let selected = el.getSelectedRows();
            return selected
    }
   
    deleteContacts(){
  
            
          
      
        let ContactsForDelition = this.getSelected();
         let ContactsForDelitionID = [];
    

        ContactsForDelition.forEach(element => {
         
  
            ContactsForDelitionID.push(element.Id);
           
        });
      
        
         
        console.log( ContactsForDelitionID);
            //   Delete [Select Id FROM CONTACT WHERE Id in :ContactsForDelitionID ];
            
            // contactDelition(ContactsForDelitionID);
            //  contactDelition(ContactsForDelitionID[0]);
             contactDelition({ //imperative Apex call
                ids: ContactsForDelitionID
            })
            this.contacts = getContacts();
            console.log(JSON.parse(JSON.stringify(this.contacts)) );
            // contactDelition(ContactsForDelitionID[0]);
            console.log("finish4");
           
      
        
    }
    // eslint-disable-next-line @lwc/lwc/no-async-await
 
      
      
      
    
    }
