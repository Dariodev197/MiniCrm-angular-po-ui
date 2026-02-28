#include 'totvs.ch'
#include 'fwmvcdef.ch'

/*/{Protheus.doc} BRCART
    Programa para uso como browse carrinho de compras
    @type  Function
    @author Klaus Wolfgram  
    @version 1.0
    /*/
Function U_BRCART()

    Private oBrowse := fwMBrowse():new()
    Private aRotina := menudef()
    
    oBrowse:setAlias('SZ0')
    oBrowse:setDescription("Carrinho de compras")
    oBrowse:setExecuteDef(4)
    oBrowse:setUseFilter(.T.)  
    oBrowse:activate()  
    
Return 

Static Function menudef

    Local aRotina[0]

    ADD OPTION aRotina TITLE 'Pesquisar' ACTION 'axPesqui'            OPERATION 1 ACCESS 0
    ADD OPTION aRotina TITLE 'Visualizar'ACTION 'VIEWDEF.BROWSECART'  OPERATION 2 ACCESS 0 
//  ADD OPTION aRotina TITLE 'Incluir'   ACTION 'VIEWDEF.BROWSECART'  OPERATION 3 ACCESS 0
    ADD OPTION aRotina TITLE 'Alterar'   ACTION 'VIEWDEF.BROWSECART'  OPERATION 4 ACCESS 0
    ADD OPTION aRotina TITLE 'Excluir'   ACTION 'VIEWDEF.BROWSECART'  OPERATION 5 ACCESS 0
    ADD OPTION aRotina TITLE 'Imprimir'  ACTION 'VIEWDEF.BROWSECART'  OPERATION 8 ACCESS 0
//  ADD OPTION aRotina TITLE 'Copiar'    ACTION 'VIEWDEF.BROWSECART'  OPERATION 9 ACCESS 0    

return aRotina

Static Function viewdef

    Local oView
    Local oModel
    Local oStrcSZ0M
    Local oStrcSZ0D

    oStrcSZ0M       := fwFormStruct(2,'SZ0',{|cCampo|  alltrim(cCampo) $ 'Z0_CODIGO,Z0_CODCLI,Z0_LOJCLI,Z0_NOME,Z0_DATA,Z0_NUMSCJ'})
    oStrcSZ0D       := fwFormStruct(2,'SZ0',{|cCampo| !(alltrim(cCampo) $ 'Z0_CODIGO,Z0_CODCLI,Z0_LOJCLI,Z0_NOME,Z0_DATA,Z0_NUMSCJ,Z0_ITEMSCJ')})

    oModel          := fwLoadModel('BROWSECART')
    oView           := fwFormView():new()

    oView:setModel(oModel)
    oView:addField('SZ0MASTER',oStrcSZ0M,'SZ0MASTER')
    oView:addGrid( 'SZ0DETAIL',oStrcSZ0D,'SZ0DETAIL')
    oView:addIncrementView('SZ0DETAIL','Z0_ITEM')
    oView:createHorizontalBox('BOXSZ0M',20)
    oView:createHorizontalBox('BOXSZ0D',80)
    oView:setOwnerView('SZ0MASTER','BOXSZ0M')  
    oView:setOwnerView('SZ0DETAIL','BOXSZ0D')  

return oView

Static Function modeldef

    Local oStrcSZ0M
    Local oStrcSZ0D
    Local oModel

    oStrcSZ0M       := fwFormStruct(1,'SZ0',{|cCampo|  alltrim(cCampo) $ 'Z0_CODIGO,Z0_CODCLI,Z0_LOJCLI,Z0_NOME,Z0_DATA,Z0_NUMSCJ'})
    oStrcSZ0D       := fwFormStruct(1,'SZ0',{|cCampo| !(alltrim(cCampo) $ 'Z0_CODIGO,Z0_CODCLI,Z0_LOJCLI,Z0_NOME,Z0_DATA,Z0_NUMSCJ')})
        
    oModel          := mpFormModel():new('MODELBROWSECART')
    oModel:setDescription('Carrinho de compras')

    oModel:addFields('SZ0MASTER',,oStrcSZ0M)
    oModel:setPrimaryKey({'Z0_FILIAL','Z0_CODIGO'})

    oModel:addGrid('SZ0DETAIL','SZ0MASTER',oStrcSZ0D)
    oModel:getModel('SZ0DETAIL'):setUniqueLine({'Z0_ITEM'})
    oModel:setRelation('SZ0DETAIL',{{'Z0_FILIAL','xFilial("SZ0")'},{'Z0_CODCLI','Z0_CODCLI'},{'Z0_LOJCLI','Z0_LOJCLI'},{'Z0_CODIGO','Z0_CODIGO'}},SZ0->(indexKey(1)))

return oModel
