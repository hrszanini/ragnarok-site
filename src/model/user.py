class User:
    def __init__(self, user_id=None, user_password=None, user_email=None, user_birthday=None):
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
        self.web_auth_token = None
        self.web_auth_token_enabled = None

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

    def show(self):
        return {
            'account_id': self.account_id,
            'userid': self.userid,
            'sex': self.sex,
            'email': self.email,
            'group_id': self.group_id,
            'state': self.state,
            'logincount': self.logincount,
            'lastlogin': self.lastlogin,
            'birthdate': self.birthdate,
            'character_slots': self.character_slots,
            'vip_time': self.vip_time,
            'old_group': self.old_group
        }

    def set(self, values_list):
        self.account_id = values_list[0]
        self.userid = values_list[1]
        self.user_pass = values_list[2]
        self.sex = values_list[3]
        self.email = values_list[4]
        self.group_id = values_list[5]
        self.state = values_list[6]
        self.unban_time = values_list[7]
        self.expiration_time = values_list[8]
        self.logincount = values_list[9]
        self.lastlogin = values_list[10]
        self.last_ip = values_list[11]
        self.birthdate = values_list[12]
        self.character_slots = values_list[13]
        self.pincode = values_list[14]
        self.pincode_change = values_list[15]
        self.vip_time = values_list[16]
        self.old_group = values_list[17]
        self.web_auth_token = values_list[18]
        self.web_auth_token_enabled = values_list[19]

        return self
