(function(d, w, undefined, $) {
    (function() {
        return search = {
            //==========================================================================
            // Inicializa las funciones de jQuery
            Init: function() {
                var self = this;
                //Inicializador del elemento Slider
                $.ajax({
                        url: 'http://localhost:3000/listas',
                        type: 'get',
                        dataType: 'json'
                    })
                    .done(function(data) {
                        if (!data.error) {
                            console.log(data);
                            $('#ciudad').append(self.renderSelect(data.ciudades));
                            $('#tipo').append(self.renderSelect(data.tipos));
                            $("#ciudad").material_select();
                            $("#tipo").material_select();
                        }
                    });

                $("#rangoPrecio").ionRangeSlider({
                    type: "double",
                    grid: false,
                    min: 0,
                    max: 100000,
                    from: 1000,
                    to: 20000,
                    prefix: "$"
                });
                //realiza la consulta de todos los datos
                $('#buscar').click(function() {
                    if ($("#checkPersonalizada")[0].checked)
                    {
                        var valores = $("#rangoPrecio").val();
                        valores = valores.split(";");
                        var urls = `http://localhost:3000/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/desde/${valores[0]}/hasta/${valores[1]}`;
                    }
                     else
                    {
                        var urls = "http://localhost:3000/search";
                    }
                    $.ajax(
                      {
                            url: urls,
                            type: 'get',
                            dataType: 'json'
                      }).done(function(data)
                        {
                            if (!data.error)
                            {
                                console.log(data);
                                $('.lista').html(self.renderCard(data.datos));
                            }
                        });
                });
                self.setSearch();

            }, //fin funcion Init,
            //==========================================================================
            // Muestra/oculta las opciones avanzadas de busqueda
            setSearch: function()
            {
                let busqueda = $('#checkPersonalizada');
                busqueda.on('change', (e) =>
                {

                    this.customSearch = !this.customSearch;

                    $('#personalizada').toggleClass('invisible');
                });
            },
            //==========================================================================
            // genera el HTML de un select, una lista de <option>
            renderSelect: function(data)
            {
                var html = '';
                data.forEach(function(key, idx)
                 {
                    html += `<option value="${key}">${key}</option>`;
                });
                return html;
            },
            //==========================================================================
            // genera el HTML para mostrar los datos de las casas que coinciden con la busqueda
            renderCard: function(obj)
            {
                    var html = '';
                    //recorre cada uno de los datos
                    obj.forEach(function(key, idx)
                    {
                        html += `<div class="card horizontal">
                                <div class="card-image">
                                    <img src="http://localhost:3000/img/home.jpg">
                                </div>
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <div>
                                            <p><strong>Direccion: </strong>${ key.Direccion }</p>
                                        </div>
                                        <div>
                                            <p><strong>Ciudad: </strong>${ key.Ciudad }</p>
                                        </div>
                                        <div>
                                            <p><strong>Telefono: </strong>${ key.Telefono }</p>
                                        </div>
                                        <div>
                                            <p><strong>Código postal: </strong>${ key.Codigo_Postal }</p>
                                        </div>
                                        <div>
                                            <p><strong>Precio: </strong>${ key.Precio }</p>
                                        </div>
                                        <div>
                                            <p><strong>Tipo: </strong>${ key.Tipo }</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                    });
                    return html;
                } //fin funcion renderCard
        };
    })();
    search.Init();
})(document, window, undefined, jQuery);
