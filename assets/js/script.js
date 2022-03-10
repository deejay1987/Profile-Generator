$(document).ready(function() {

    $("body")
        .on("click", "#generate_profile_btn", function(){

            /* This will allow selected options value to be generated */
            for(let i = 0; i < $("#number_generate_profile").val(); i++){
                let profile_id = Math.floor((Math.random() * 100) + 1);
                
                $.ajax({
                    url: 'https://randomuser.me/api/',
                    dataType: 'json',
                    success: function(data) {
                        /* this will generate random profile */
                        const profile_details = data.results[0];

                        $("#generated_profile").append(
                            "<li data-profile-id='" + profile_id + "' class='profile'>" +
                            `<img src="`+ profile_details.picture.large +`" alt="Random User">` +
                                `<div class="profile_details">
                                    <h2>` + profile_details.name.first + " " + profile_details.name.last +`</h2>
                                    <span><i class="fa fa-envelope"></i>`+ " " + profile_details.email +`</span>
                                    <p><i class="fa fa-location-dot"></i>`+ " " + profile_details.location.street.number + " "
                                        + profile_details.location.street.name + " "
                                        + profile_details.location.state + " "
                                        + profile_details.location.country + 
                                    `</p>
                                </div>` +
                                "<button type='button' class='close_profile_btn'>x</button>" +
                            "</li>"
                        );
                    }
                });
            };
        }) 
        /* This will delete the specific profile */
        .on("click", ".close_profile_btn", function() {
            
            $("#generated_profile li[data-profile-id="+ $(this).closest(".profile").data("profile-id") +"]").remove();
        })
        .on("click", "#reset_btn", function(){
            window.location.reload();
        });
});