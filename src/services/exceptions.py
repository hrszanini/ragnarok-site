class ForbiddenAccess(RuntimeError):
    def __init__(self, msg):
        self.msg = msg
        super(ForbiddenAccess, self).__init__(msg)
