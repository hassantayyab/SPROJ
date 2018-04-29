import Tokens
import ply.lex as lex
import ply.yacc as yacc

start = 'program'
check=1

precedence = (
        ('left', 'OROR'),
        ('left', 'ANDAND'),
        ('left', 'EQUALEQUAL'),
        ('left', 'LT', 'LE', 'GT','GE'),
        ('left', 'PLUS', 'MINUS'),
        ('left', 'TIMES', 'DIVIDE'),
        ('right', 'NOT'),
)

tokens = (
        'ANDAND',       # &&
        'COMMA',        # ,
        'DIVIDE',       # /
        'ELSE',         # else
        'EQUAL',        # =
        'EQUALEQUAL',   # ==
        'FALSE',        # false
        'FUNCTION',     # function
        'GE',           # >=
        'GT',           # >
        'IDENTIFIER',   #### Not used in this problem.
        'IF',           # if
        'LBRACE',       # {
        'LE',           # <=
        'LPAREN',       # (
        'LT',           # <
        'MINUS',        # -
        'NOT',          # !
        'NUMBER',       #### Not used in this problem.
        'OROR',         # ||
        'PLUS',         # +
        'RBRACE',       # }
        'RETURN',       # return
        'RPAREN',       # )
        'SEMICOLON',    # ;
        'TIMES',        # *
        'TRUE',         # true
        'NOTEQUAL',      #!=
        'STATEMENT',
        'OPERATOR',
        'RELATIONALOPERATOR',
        'INT',
        'DOUBLE',
        'CHARS',
        'STRINGS',
        'BOOL',
        'LBRACK',
        'RBRACK',
        'FOR',
        'SPACE',
        'STRING',
        'CHAR',
        'VOID',
        'PRINTF',
        'INVERTED_COMMA',
        'PERCENTAGE'
        
        
)


def p_program(p):
	'program : statement program'
	p[0]=[p[1]]+p[2]

def p_program_empty(p):
	'program : '
	p[0]=[]

def p_statements_continue(p):
	'statements : statement statements'
	p[0]=[p[1]]+p[2]

def p_statements_empty(p):
	'statements : '
	p[0]=[]

#def p_statement_ret(p):
#	'statement : ret'
#	p[0]=p[1]


def p_statement_assignment(p):
	'statement : assignment'
	p[0]=p[1]

def p_statement_if(p):
	'statement : if'
	p[0]=p[1]

def p_statement_for(p):
	'statement : for'
	p[0]=p[1]

def p_statement_array(p):
	'statement : array'
	p[0]=p[1]

def p_statement_function(p):
	'statement : func'
	p[0]=p[1]

def p_statement_print(p):
	'statement : print'
	p[0]=p[1]

def p_statement_empty(p):  
	'statement : '
	p[0]=[ ]

def p_func_empty(p):
	'func : type IDENTIFIER LPAREN RPAREN LBRACE RBRACE'
	p[0]=("func",p[1],p[2],[])

def p_func_empty(p):
	'func : type IDENTIFIER LPAREN args RPAREN LBRACE RBRACE'
	p[0]=("func",p[1],p[2],p[4],p[5],[])

def p_args(p):
	'args : type IDENTIFIER COMMA args'
	p[0]=[([p[1],p[2]])]+p[4]

def p_args_2(p):
	'args : type IDENTIFIER'
	p[0]=[([p[1],p[2]])]
 
def p_args_empty(p):
 	'args : '
 	p[0]=[]

#def ret(p):
	#'ret : RETURN foo SEMICOLON'
	#p[0]=("return",p[2])

#def foo(p):
	#'foo : NUMBER'
	#p[0]=("number",p[1])

#def foo_1(p):
	#'foo : IDENTIFIER'
	#p[0]=("identifier",p[1])

#def foo_2(p):
	#'foo : func OPERATOR foo'
	#p[0]=("bin-op",p[1],p[2],p[3])

#def foo_3(p):
	#'foo : NUMBER OPERATOR foo'
	#p[0]=("bin-op",p[1],p[2],p[3])

#def foo_4(p):
	#'foo : '
	#p[0]=[]


def p_func(p):
	'func : type IDENTIFIER LPAREN args RPAREN LBRACE statements RBRACE'
	p[0]=("func-declare",p[1],p[2],p[4],p[7])


def p_func_2(p):
	'func : IDENTIFIER LPAREN rec RPAREN SEMICOLON'
	p[0]=("func_call",p[1],p[3])

def p_rec_1(p):
	'rec : exp'
	p[0]=[p[1]]

def p_rec(p):
	'rec : exp COMMA rec'
	p[0]=[p[1]]+p[3]

def p_rec_2(p):
	'rec : '
	p[0]=[]


def p_func_3(p):
	'func : type IDENTIFIER LPAREN RPAREN LBRACE statements RBRACE'
	p[0]=("func",p[1],p[2],p[6])



def p_assignment_sp(p):
	'assignment : IDENTIFIER OPERATOR SEMICOLON'
	p[0]=("assignment",("identifier",p[1]),p[2])

def p_assignment_1(p):
	'assignment : IDENTIFIER EQUAL exp SEMICOLON'
	p[0]=("assignment",p[1],p[3])

def p_assignment_declare(p):
	'assignment : type IDENTIFIER EQUAL exp SEMICOLON'
	p[0]=("assignment-type",p[1],p[2],p[4])

def p_assignment(p):
	'assignment : type IDENTIFIER SEMICOLON'
	p[0]=("assignment-type",p[1],p[2])

def p_if(p):
	'if : IF LPAREN exp_if RPAREN LBRACE statements RBRACE else_elseif'
	p[0]=(p[1],p[3],p[6],p[8])

def p_else_elseif_elseif(p):
	'else_elseif : elseif else_elseif'
	p[0]=[p[1]]+p[2]

def p_else_elseif_else(p):
	'else_elseif : else else_elseif'
	p[0]=[p[1]]+p[2]

def p_else_elseif_empty(p):
	'else_elseif : '
	p[0]=[ ]

def p_elseif(p):
	'elseif : ELSE IF LPAREN exp_if RPAREN LBRACE statements RBRACE'
	p[0]=("else if",p[4],p[7])

def p_else(p):
	'else : ELSE LBRACE statements RBRACE'
	p[0]=(p[1],p[3])

def p_for(p):
	'for : FOR LPAREN exp_for RPAREN LBRACE statements RBRACE'
	p[0]=(p[1],p[3],p[6])

def p_exp_if_identifier(p):
	'exp_if : IDENTIFIER'
	p[0]=("identifier",p[1])

def p_exp_if_number(p):
	'exp_if : NUMBER'
	p[0]=("number",p[1])

#def p_exp_if_string(p):
#	'exp_if : STRING'
#	p[0]=("string",p[1])

def p_exp_if_char(p):
	'exp_if : CHAR'
	p[0]=("char",p[1])


def p_exp_if_reloperator(p):
	'exp_if : exp_if RELATIONALOPERATOR exp_if'
	p[0]=("rel-op",p[1],p[2],p[3])

def p_exp_for(p):
	'exp_for : init exp_if SEMICOLON increment'
	p[0]=(p[1],p[2],p[4])

def p_exp_for_init_1(p):
	'init : IDENTIFIER EQUAL exp SEMICOLON'
	p[0]=("assignment",p[1],p[3])

def p_exp_for_init_2(p):
	'init : IDENTIFIER SEMICOLON'
	p[0]=("identifier",p[1])

def p_for_increment_1(p):
	'increment : IDENTIFIER OPERATOR'
	p[0]=("bin-op",("identifier",p[1]),p[2])

def p_for_increment_2(p):
	'increment : IDENTIFIER EQUAL exp'
	p[0]=("assignment",p[1],p[3])

def p_exp_identifier(p):
	'exp : IDENTIFIER'
	p[0]=("identifier",p[1])

def p_exp_number(p):
	'exp : NUMBER'
	p[0]=("number",p[1])

#def p_exp_string(p):
#	'exp : STRING'
#	p[0]=("string",p[1])

def p_exp_char(p):
	'exp : CHAR'
	p[0]=("char",p[1])

def p_exp_bool(p):
	'exp : TRUE'
	p[0]=("bool",p[1])

def p_exp_bool_0(p):
	'exp : FALSE'
	p[0]=("bool",p[1])


def p_exp_array(p):
	'exp : IDENTIFIER LBRACK NUMBER RBRACK'
	p[0]=("array-access",p[1],("number",p[3]))

def p_exp_array_id(p):
	'exp : IDENTIFIER LBRACK IDENTIFIER RBRACK'
	p[0]=("array-access",p[1],("identifier",p[3]))

def p_exp_operator(p):
	'exp : exp OPERATOR exp'
	p[0]=("bin-op",p[1],p[2],p[3])

def p_exp_operator_2(p):
	'exp : exp OPERATOR'
	p[0]=("bin-op",p[1],p[2])


def p_array(p):
	'array : type IDENTIFIER LBRACK NUMBER RBRACK SEMICOLON'
	p[0]=("array",p[1],p[2],p[4])

def p_array_declare(p):
	'array : type IDENTIFIER LBRACK NUMBER RBRACK EQUAL LBRACE elements_array RBRACE SEMICOLON'	
	p[0]=("array",p[1],p[2],p[4],p[8])

def p_array_declare_empty(p):
	'array : type IDENTIFIER LBRACK RBRACK EQUAL LBRACE elements_array RBRACE SEMICOLON'	
	p[0]=("array",p[1],p[2],[],p[7])

def p_array_assign_2(p):
	'array : IDENTIFIER LBRACK NUMBER RBRACK EQUAL exp SEMICOLON'
	p[0]=("array-assign",p[1],("number",p[3]),p[6])

def p_array_assign_3(p):
	'array : IDENTIFIER LBRACK IDENTIFIER RBRACK EQUAL exp SEMICOLON'
	p[0]=("array-assign",p[1],("identifier",p[3]),p[6])

def p_elements_number(p):
	'elements_array : NUMBER'
	p[0]=[["number",p[1]]]

#def p_elements_string(p):
#	'elements_array : STRING'
#	p[0]=["string",p[1]]

def p_elements_char(p):
	'elements_array : CHAR'
	p[0]=[["char",p[1]]]

def p_elements_bool_1(p):
	'elements_array : TRUE'
	p[0]=[["bool",p[1]]]

def p_elements_bool_0(p):
	'elements_array : FALSE'
	p[0]=[["bool",p[1]]]


def p_elements_array(p):
	'elements_array : elements_array COMMA elements_array'
	p[0]=p[1]+p[3]

def p_elements_array_empty(p):
	'elements_array : '
	p[0]=[]

def p_print(p):
	'print : PRINTF LPAREN STRING COMMA arguments RPAREN SEMICOLON'
	p[0]=(p[1],p[3],p[5])

def p_arguments_3(p):
	'arguments : exp'
	p[0]=[p[1]]

def p_arguments_2(p):
	'arguments : exp COMMA arguments'
	p[0]=[p[1]]+p[3]

def p_arguments_1(p):
	'arguments : IDENTIFIER'
	p[0]=[("identifier",p[1])]+p[3]

def p_arguments(p):
	'arguments : IDENTIFIER COMMA arguments'
	p[0]=[("identifier",p[1])]+p[3]

def p_arguments_empty(p):
	'arguments : '
	p[0]=[]

def p_type_int(p):
	'type : INT'
	p[0]=p[1]

def p_type_double(p):
	'type : DOUBLE'
	p[0]=p[1]

def p_type_char(p):
	'type : CHARS'
	p[0]=p[1]

def p_type_string(p):
	'type : STRINGS'
	p[0]=p[1]

def p_type_bool(p):
	'type : BOOL'
	p[0]=p[1]

def p_type_void(p):
	'type : VOID'
	p[0]=p[1]


def p_error(p):
	print (p)



clexer = lex.lex(module=Tokens)
cparser = yacc.yacc()
cast = cparser.parse('int x=4; int y=x+5; for(x;x<10;x++){if(x<5){x++;}else{for(y;y<10;y++){y++;} x=9;}}', lexer=clexer)
#cast = cparser.parse('int x=4; int y=x+5; for(x;x<10;x++){if(x<5){x++;}for(y;y<10;y++){y++;}}', lexer=clexer)

print(cast)

for_for=0;
for_while=0;
while_for=0;
while_while=0;
if_1iden_1const=0;
if_2iden=0;

def treatforloops(x):
	for z in x:
		print(z)

for x in cast:
	if 'for' in x:
		treatforloops(x[2:])




def checkelse(x):
	print(1)
			


def checkif(x):
	if 'if' in x:
		if (('identifier' in x[1][1]) and ('identifier' in x[1][3])):
			global if_2iden
			if_2iden+=1
			checkfor_for(x[1:])
			checkwhile_while(x[1:])

		elif (('identifier' in x[1][1]) or ('identifier' in x[1][3])):
			global if_1iden_1const
			if_1iden_1const+=1
			checkfor_for(x[1:])
			checkwhile_while(x[1:])

		if(x[-1] is not []):
			for conds in x[-1]:
				checkelse(conds)


def checkfor_for(x):
	for y in (1,len(x)-1):
		for z in x[y]:
			#print(z)
			checkif(z)
			if 'for' in z:
				global for_for
				for_for+=1
			if 'while' in z:
				global for_while
				for_while+=1

def checkwhile_while(x):
	for y in (1,len(x)-1):
		for z in x[y]:
			checkif(z)
			if 'for' in z:
				global while_for
				while_for+=1
			if 'while' in z:
				global while_while
				while_while+=1
		


for x in cast:
	if 'for' in  x:
		checkfor_for(x)
	elif 'while' in x: 
		checkwhile_while(x)


 							
print(for_for)
print(for_while)
print(while_for)
print(while_while)
print(if_2iden)
print(if_1iden_1const)
 