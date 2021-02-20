class User:
    def __init__(self, user_id, user_password, user_email, user_birthday):
        self.account_id = None
        self.userid = user_id
        self.user_pass = user_password
        self.email = user_email
        self.sex = 'S'
        self.group_id = 0
        self.state = 0
        self.unban_time = 0
        self.expiration_time = 0
        self.logincount = 0
        self.lastlogin = 0
        self.last_ip = ''
        self.birthdate = user_birthday
        self.character_slots = 0
        self.pincode = ''
        self.pincode_change = ''
        self.vip_time = 0
        self.old_group = 0
        self.web_auth_token = 0
        self.web_auth_token_enabled = 'NULL'

    def dict(self):
        return {
            'account_id': self.account_id,
            'userid': self.userid,
            'user_pass': self.user_pass,
            'sex': self.sex,
            'email': self.email,
            'group_id': self.group_id,
            'state': self.state,
            'unban_time': self.unban_time,
            'expiration_time': self.expiration_time,
            'logincount': self.logincount,
            'lastlogin': self.lastlogin,
            'last_ip': self.last_ip,
            'birthdate': self.birthdate,
            'character_slots': self.character_slots,
            'pincode': self.pincode,
            'pincode_change': self.pincode_change,
            'vip_time': self.vip_time,
            'old_group': self.old_group,
            'web_auth_token': self.web_auth_token,
            'web_auth_token_enabled': self.web_auth_token_enabled
        }
