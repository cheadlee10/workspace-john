import pathlib
repls=[
("<input id='name' name='name' required autocomplete='name'/>","<input type='text' id='name' name='name' required autocomplete='name'/>"),
("<input id='phone' name='phone' required autocomplete='tel'/>","<input type='tel' id='phone' name='phone' required autocomplete='tel'/>"),
("<input id='qname' name='name' required autocomplete='name'/>","<input type='text' id='qname' name='name' required autocomplete='name'/>"),
("<input id='qphone' name='phone' required autocomplete='tel'/>","<input type='tel' id='qphone' name='phone' required autocomplete='tel'/>"),
("<input id='qemail' name='email' autocomplete='email'/>","<input type='email' id='qemail' name='email' autocomplete='email'/>"),
("<input id='qemail' name='email' required autocomplete='email'/>","<input type='email' id='qemail' name='email' required autocomplete='email'/>")
]
for p in pathlib.Path('sites/premium-v3-wave7').rglob('index.html'):
    s=p.read_text(encoding='utf-8')
    o=s
    for a,b in repls:
        s=s.replace(a,b)
    if s!=o:
        p.write_text(s,encoding='utf-8')
        print('updated',p)
