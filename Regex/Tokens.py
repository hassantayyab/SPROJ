import ply.lex as lex

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

#
# Write your code here.
#
t_SPACE=r'\s'
t_ANDAND =  r'&&'
t_NOTEQUAL=r'!='
t_COMMA =  r','
t_DIVIDE =  r'/'
t_EQUALEQUAL = r'=='
t_EQUAL = r'='

t_FUNCTION = r'function'
t_GE =  r'>='
t_GT =   r'>'
t_LBRACE = r'\{'
t_LE =  r'<='
t_LPAREN =   r'\('
t_LT = r'<'
t_MINUS = r'-'
t_NOT = r'!'
t_OROR = r'\|\|'
t_PLUS = r'\+'
t_RBRACE =  r'\}'
t_RETURN = r'return'
t_RPAREN =  r'\)'
t_SEMICOLON =   r';'
t_TIMES = r'\*'

t_LBRACK= r'\['
t_RBRACK=r'\]'
t_INVERTED_COMMA=r'\"'

t_ignore = ' \t\v\r' # whitespace

def t_TRUE(token):
    r'true'
    return token

def t_FALSE(token):
    r'false'
    return token

def t_RELATIONALOPERATOR(token):
	r'(!=|<=|>=|<|>|==)'
	return token

def t_FOR(token):
	r'for'
	return token

def t_NUMBER(token):
    r'-?[0-9]+(?:\.[0-9]*)?'
    #token.value = float(token.value)
    return token

def t_OPERATOR(token):
    r'(/|\*|%|\+\+|--|\+|-)'
    return token 

def t_IF(token):
    r'if'
    return token

def t_ELSE(token):
    r'else'
    return token

def t_INT(token):
    r'int'
    return token

def t_DOUBLE(token):
    r'double'
    return token

def t_CHARS(token):
    r'char'
    return token

def t_STRINGS(token):
    r'string'
    return token

def t_BOOL(token):
    r'bool'
    return token

def t_VOID(token):
    r'void'
    return token


def t_newline(t):
        r'\n'
        t.lexer.lineno += 1

def t_error(t):
        print ("JavaScript Lexer: Illegal character " + t.value[0])
        t.lexer.skip(1)

def t_CHAR(token):
	r'[\'](.*?)[\']'
	token.value=token.value[1:-1]
	return token

def t_PRINTF(token):
    r'printf'
    return token


def t_STRING(token):
	r'[\"](.*?)[\"]'
	token.value=token.value[1:-1]
	return token

def t_IDENTIFIER(token):
        r'[A-Za-z][A-Za-z_]*'
        return token





