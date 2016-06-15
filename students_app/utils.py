def normalize_name_for_db(name):
    if name:
        n = name.lower()
        n = n[0].upper() + n[1:]
        return n
    else:
        return None
