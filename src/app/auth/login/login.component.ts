import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators
} from "@angular/forms";
import { LoginCredentials } from "../../core/state/auth/auth.model";
import * as FormUtil from "../../util/form.util";
import * as ValidationUtil from "../../util/validation.util";

@Component({
    selector: "blog-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

    /**
     * Dispatches an event to perform login.
     */
    @Output()
    public login: EventEmitter<LoginCredentials> = new EventEmitter<LoginCredentials>();

    /**
     * Reference to the login form.
     */
    public loginForm: FormGroup;

    /**
     * Constructor
     */
    constructor(private formBuilder: FormBuilder) {}

    /**
     * Initializes the component by building the form.
     */
    public ngOnInit(): void {
        this.loginForm = new FormGroup(
            this.formBuilder.group({
                username: [
                    "",
                    [
                        Validators.required,
                        Validators.email
                    ]
                ],
                password: [
                    "",
                    [
                        Validators.required,
                        Validators.maxLength(ValidationUtil.VALIDATION_RULE.PASSWORD.MAX_LENGTH)
                    ]
                ],
            }).controls,
            {
                updateOn: "blur"
            }
        );
    }

    /**
     * Accessor for the form's value, aka the data container object representing the
     * form field's current values.
     */
    public getFormValue(): LoginCredentials {
        return {
            username: FormUtil.getFormFieldValue(this.loginForm, "username"),
            password: FormUtil.getFormFieldValue(this.loginForm, "password")
        };
    }

    /**
     * Handles the form submission and emits a login event with the user's credentials.
     * @param event
     */
    public onLogin(event: any) {
        const payload: LoginCredentials = this.getFormValue();
        console.log(`onLogin( username: ${payload.username}, username: ${payload.password} )`);
        this.login.emit(payload);
    }
}